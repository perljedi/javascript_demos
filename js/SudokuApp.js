var AngularSudoku = angular.module("AngularSudoku", []);

var SudokuGame = AngularSudoku.controller("SudokuGame", function($scope){
	$scope.cells = [];
	$scope.rows = [[],[],[],[],[],[],[],[],[]];
	$scope.columns = [[],[],[],[],[],[],[],[],[]];
	$scope.cubes = [[],[],[],[],[],[],[],[],[]];
	$scope.currentNumber = 1;
	for(var r = 0; r<9; r++){
		for(var c = 0; c< 9; c++){
			var cn = 3 * (parseInt(r/3)) + (c%3);
			var cell = {row:r, column:c, value:"", cube:cn};
			$scope.cells.push(cell);
			$scope.rows[r][c] = cell;
			$scope.columns[c][r] = cell;
			$scope.cubes[cn].push(cell);
		}
	}
	$scope.setCellValue = function(cell){
		cell.value = $scope.currentNumber;
	}
	$scope.setCurrentNumber = function(number){
		$scope.currentNumber = number;
	}
	$scope.getControlStyle = function(number){
		if(number == $scope.currentNumber){
			return {backgroundColor:'yellow'};
		}else{
			return {};
		}
	}
});
