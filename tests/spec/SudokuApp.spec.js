require(["lib/angular", "lib/angular-mocks", "SudokuApp"], function(){

    describe("Sudoku App", function(){
        beforeEach(function(){
            module("AngularSudoku");
        });

        describe("sudokuGame", function(){
            var scope;
            var ctrl;
            beforeEach(inject(function($controller){
                scope = {};
                ctrl = $controller('SudokuGame', { $scope: scope });
            }));
            it("should have 81 cells", function(){
                expect(scope.cells).toBeDefined();
                expect(scope.cells.length).toBe(81);
            });
            describe("isValueInUnit", function(){
                it("returns true if cell with value is in list", function(){
                    expect(scope.valueIsInUnit(1,[{value:1},{value:2},{value:3}])).toBeTruthy();
                });
                it("returns true if cell with value is in list", function(){
                    expect(scope.valueIsInUnit(1,[{value:2},{value:3},{value:4}])).toBeFalsy();
                });
            });
            describe("canCellTakeValue", function(){
                it("returns false if value is taken in the cells row", function(){
                    var row = scope.rows[1];
                    row[1].value=2;
                    expect(scope.canCellTakeValue(row[0], 2)).toBeFalsy();
                });   
                it("returns false if value is taken in the cells column", function(){
                    var col = scope.columns[2];
                    col[4].value=3;
                    expect(scope.canCellTakeValue(col[0], 3)).toBeFalsy();
                });   
                it("returns false if value is takein in the cells box", function(){
                    var box = scope.cubes[3];
                    box[5].value=8;
                    expect(scope.canCellTakeValue(box[0], 8)).toBeFalsy();
                });   
                it("returns true if value is not in the cells box, row, or column", function(){
                    expect(scope.canCellTakeValue(scope.rows[4][2], 7)).toBeTruthy();
                });
            });
            describe("validateBoard", function(){
                it("returns false if one or more cells are in conflict", function(){
                    scope.rows[0][0].value=1;
                    scope.rows[0][1].value=1;
                    expect(scope.validateBoard()).toBeFalsy();
                });
                it("returns true if no conflicts are found", function(){
                    scope.rows[0][0].value="";
                    scope.rows[0][1].value="";
                    expect(scope.validateBoard()).toBeTruthy();
                });
                it("sets 'isError' on conflicting cells", function(){
                    scope.rows[0][0].value=1;
                    scope.rows[0][1].value=1;
                    expect(scope.validateBoard()).toBeFalsy();
                    expect(scope.rows[0][0].isError).toBeTruthy();
                    expect(scope.rows[0][1].isError).toBeTruthy();
                });
            });
            describe("solvePuzzle", function(){
                it("checks that puzzle is in valid state before trying to solve",function(){
                    spyOn(scope, 'validateBoard');
                    scope.solvePuzzle();
                    expect(scope.validateBoard).toHaveBeenCalled();
                });
            });
        });
    });
});
