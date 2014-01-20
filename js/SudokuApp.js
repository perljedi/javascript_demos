var AngularSudoku = angular.module("AngularSudoku", ["ngAnimate"]);

var SudokuGame = AngularSudoku.controller("SudokuGame", ["$scope", "$animate", function($scope,$animate){
    $scope.initBoard = function(){
        $scope.cells = [];
        $scope.rows = [[],[],[],[],[],[],[],[],[]];
        $scope.columns = [[],[],[],[],[],[],[],[],[]];
        $scope.cubes = [[],[],[],[],[],[],[],[],[]];
        for(var r = 0; r<9; r++){
            for(var c = 0; c< 9; c++){
                var cn = 3 * (parseInt(r/3)) + parseInt(c/3);
                var cell = {row:r, column:c, value:"", cube:cn, isError:false};
                $scope.cells.push(cell);
                $scope.rows[r][c] = cell;
                $scope.columns[c][r] = cell;
                $scope.cubes[cn].push(cell);
            }
        }
    }
    $scope.initBoard();
	$scope.currentNumber = 1;
    $scope.errorMessage;
    $scope.importExportJson = "";
	for(var r = 0; r<9; r++){
		for(var c = 0; c< 9; c++){
			var cn = 3 * (parseInt(r/3)) + parseInt(c/3);
			var cell = {row:r, column:c, value:"", cube:cn, isError:false};
			$scope.cells.push(cell);
			$scope.rows[r][c] = cell;
			$scope.columns[c][r] = cell;
			$scope.cubes[cn].push(cell);
		}
	}
	$scope.setCellValue = function(cell, $event){
        debugger
        $animate.addClass($($event.target), 'redCell');
		cell.value = $scope.currentNumber;
	}
	$scope.setCurrentNumber = function(number){
		$scope.currentNumber = number;
	}
	$scope.getControlStyle = function(number){
        var styles = {};
		if(number == $scope.currentNumber){
			styles.backgroundColor='yellow';
		}
        return styles;
	}
    $scope.validateBoard = function(){
        var isValid = true;
        angular.forEach($scope.cells, function(cell,index){
            if(cell.value != ""){
                var matchedRowItems  = jQuery.grep($scope.rows[cell.row], function(val,i){ 
                    return val.value == cell.value;
                });
                var matchedColItems  = jQuery.grep($scope.columns[cell.column], function(val,i){
                    return val.value == cell.value;
                });
                var matchedCubItems  = jQuery.grep($scope.cubes[cell.cube], function(val,i){
                    return val.value == cell.value;
                });
                if(matchedRowItems.length > 1 || matchedCubItems.length > 1 || matchedColItems > 1){
                    cell.isError=true;
                    isValid = false;
                }else{
                    cell.isError=false;
                }
            }else{
                var values = $scope.getValidValuesForCell(cell);
                if(values.length < 1){
                    cell.isError=true;
                    isValid = false;
                }else{
                    cell.isError=false;
                }
            }
        });
        return isValid;
    }
    $scope.getCellStyle = function(cell){
        var styles={};
        if(cell.isError){
            styles.backgroundColor="red";
        }
        return styles;
    }
    $scope.exportCurrentBoard = function(){
        $scope.importExportJson = angular.toJson($scope.cells);
    }
    $scope.importBoardState = function(){
        $scope.cells = angular.fromJson($scope.importExportJson);
        $scope.cubes=[[],[],[],[],[],[],[],[],[],[]];
        angular.forEach($scope.cells, function(cell, index){
            $scope.rows[cell.row][cell.column]=cell;
            $scope.columns[cell.column][cell.row]=cell;
            $scope.cubes[cell.cube].push(cell);
        });
    }
    $scope.solvePuzzle = function(){
        if($scope.validateBoard()){
            var changed=true;
            while(changed){
                changed = $scope.checkValuesInCells();
                changed = $scope.checkValuesInGroup($scope.rows) || changed;
                changed = $scope.checkValuesInGroup($scope.columns) || changed;
                changed = $scope.checkValuesInGroup($scope.cubes) || changed;
            }
            var unkownCells = jQuery.grep($scope.cells, function(cell, i){
                return cell.value == "";
            });
            return unkownCells.length == 0;
        }else{
            return false;
        }
    }
    $scope.checkValuesInCells = function(){
        var changed = false;
        angular.forEach($scope.cells, function(cell, index){
            if(cell.value == ""){
                var values=$scope.getValidValuesForCell(cell);
                if(values.length == 1){
                    cell.value = values[0];
                    changed=true;
                }
            }
        });
        return changed;
    }
    $scope.getValidValuesForCell = function(cell){
        var values=[];
        for(var val=1; val<10; val++){
            if($scope.canCellTakeValue(cell, val)){
                values.push(val);
            }
        }
        return values;
    }
    $scope.checkValuesInGroup = function(groups){
        var changed = false;
        angular.forEach(groups, function(group,index){
            for(var val=1; val<10; val++){
                if(! $scope.valueIsInUnit(val, group)){
                    var cells=[];
                    angular.forEach(group, function(cell, offset){
                        if(cell.value == "" && $scope.canCellTakeValue(cell, val)){
                            cells.push(cell);
                        }
                    });
                    if(cells.length == 1){
                        changed=true;
                        cells[0].value = val;
                    }
                }
            }
        });
        return changed;
    }
    $scope.canCellTakeValue = function(cell, value){
        return ! $scope.valueIsInUnit(value, $scope.rows[cell.row])
            && ! $scope.valueIsInUnit(value, $scope.columns[cell.column])
            && ! $scope.valueIsInUnit(value, $scope.cubes[cell.cube]);
    }
    $scope.valueIsInUnit = function(value, unit){
        return jQuery.grep(unit, function(val,i){
                    return val.value == value;
        }).length > 0;
    }
    $scope.generatePuzzle = function(){
        var count=0;
        $scope.initBoard();
        var solveable = false;
        $scope.exportCurrentBoard();
        while(! solveable){
            $scope.importBoardState();
            var changed = false;
            while(! changed){
                if(count++ > 1000){
                    console.log("bad");
                    return;
                }
                var col = Math.floor((Math.random()*9));
                var row = Math.floor((Math.random()*9));
                if($scope.rows[row][col].value == ""){
                    var val = Math.floor((Math.random()*9)+1);
                    if($scope.canCellTakeValue($scope.rows[row][col], val)){
                        $scope.rows[row][col].value = val;
                        changed = true;
                    }
                }
            }
            $scope.$apply($scope.exportCurrentBoard());
            debugger;
            solveable = $scope.solvePuzzle();  
        }
        console.log("good");
    }
}]);
