require("../SudokuApp.js");

describe("Sudoku App", function(){
    beforeEach(function(){
        module("SudokuApp");
    });

    describe("sudokuGame", function(){
        var scope;
        var ctrl;
        beforeEach(inject(function($controller){
            scope = {};
            ctrl = $controller('SudokuGame', { $scope: scope });
        });
        it("should have 81 cells", function(){
            expect(scope.cells).toBeDefined();
            expect(scope.cells.length).toBe(81);
        });
    });
});

