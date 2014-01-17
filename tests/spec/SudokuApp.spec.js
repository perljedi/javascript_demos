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
        });
    });
});
