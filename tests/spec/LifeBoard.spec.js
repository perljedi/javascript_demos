require("../../js/LifeBoard.js");
require("../../js/LifeCell.js");

describe("LifeBoard", function() {
    var board;
    beforeEach(function(){
        board = new LifeBoard(8,8);
    });
	it("should be instantiateable", function() {
		expect(new LifeBoard()).toBeDefined();
	});
	it("should know its iteration", function() {
		expect(board.itteration()).toBeGreaterThan(-1);
	});
    it("should increase its ittation when evolve is called", function(){
        var ci = board.itteration();
        board.evolve();
        expect(board.itteration()).toBeGreaterThan(ci);
    });
    it("should have a size. ", function(){
        expect(board.getWidth()).toBeGreaterThan(-1);
        expect(board.getHeight()).toBeGreaterThan(-1);
    });
    it("should encapsulate its size ", function(){
        var mBoard = new LifeBoard(4,8);
        expect(mBoard.getWidth()).toEqual(4);
        board.width=5;
        expect(mBoard.getWidth()).not.toEqual(5);
    });
    it("should be able to return a cell by its coordinates", function(){
        expect(board.getCell(2,2)).toBeDefined();
    });
    it("should be able to evolve", function() { 
        expect(board.evolve());
    });

    it("should be able to resize width", function() {
        expect(board.setWidth(5)).toBe();
    });

    it("should be able to resize height", function() {
        expect(board.setHeight(5)).toBe();
    }); 
    
    describe("LifeBoard Itterator", function(){
        var itterator;
        beforeEach(function(){
            itterator = board.getCells();
        });

        it("should support 'hasMore'", function(){
            expect(itterator.hasMore()).toBeDefined();  
        });

        it("should support 'getNext'", function(){
            expect(itterator.getNext()).toBeDefined();
        });

        it("should return have 64 objects when created from an 8x8 board", function(){
            var count=0;
            while(itterator.hasMore()){
                itterator.getNext();
                count++;
            }
            expect(count).toBe(64);
        });

        it("should return null after all objects have been fetched", function() {
            var count=0;
            while(itterator.hasMore()){
                itterator.getNext();
                count++;
            }   
            expect(itterator.getNext()).toBeNull();
        });
        
        it("should not be effected by other itterators", function() {
            var count=0;
            while(itterator.hasMore()){
                itterator.getNext();
                var otherItterator = board.getCells();
                otherItterator.getNext();
                otherItterator.getNext();
                count++;
            }   
            expect(count).toBe(64);
        });

    });
});
