describe("The Game of Life", function(){
    var board;
    beforeEach(function(){
        board = new LifeBoard(8,8);
    });

    it("should die out after 1 itteration with only one live cell", function(){
        var myCell = board.getCell(2,2);
        myCell.revive();
        board.evolve();
        expect(board.getCell(2,2).isAlive()).toBeFalsy();
    });
    it("should remain unchanged with a 2x2 cluster of live cells", function(){
        for(var r=2; r<4; r++){
            for(var c=2; c<4; c++){
                var myCell = board.getCell(r,c);
                myCell.revive();
            }   
        }   
        board.evolve();
        for(var r=2; r<4; r++){
            for(var c=2; c<4; c++){
                var myCell = board.getCell(r,c);
                expect(myCell.isAlive()).toBeTruthy();
            }
        }
    });
});
