require(["LifeCell"], function(){

describe("LifeCell", function() {
    var cell;
    beforeEach(function() { 
        cell = new LifeCell(true);
    });

	it("should be able to be instantiated", function() {
		expect(cell).toBeDefined();
	});
	it("should have neighbors", function() {
		expect(cell.getNeighbors()).toBeDefined();
	});
	it("should have a current state", function() {
		var liveLifeCell = new LifeCell(true);
		expect(liveLifeCell.isAlive()).toBeTruthy();
		var deadLifeCell = new LifeCell(false);
		expect(deadLifeCell.isAlive()).toBeFalsy();
	});

    it("should be able to count its live neighbors", function(){
        setLiveNeighbors(cell,2);
        expect(cell.countLiveNeighbors()).toBe(2);
    });
	it("should be able to evolve", function() {
		expect(cell.evolve()).toBeDefined();
	});

	it("should evolve to a dead cell if it has less than two live neighbors", function () {
        setLiveNeighbors(cell, 1);
		expect(cell.evolve()).toBeFalsy();
	});

    it("should be able to be killed and revived", function(){
        expect(cell.isAlive()).toBeTruthy();
        cell.kill();
        expect(cell.isAlive()).toBeFalsy();
        cell.revive();
        expect(cell.isAlive()).toBeTruthy();
    });
	
	it("should evolve to a live cell if it has three live neighbors", function () {
        setLiveNeighbors(cell,3);
		expect(cell.evolve()).toBeTruthy();
	});
	
	it("should evolve to the same life state with two live neighbors", function(){
        setLiveNeighbors(cell,2);
		expect(cell.evolve()).toBeTruthy();
		var deadLifeCell = new LifeCell(false);
        setLiveNeighbors(deadLifeCell, 2);
		expect(deadLifeCell.evolve()).toBeFalsy();

	});

	it("should evolve to a dead cell with more than three neighbors", function(){
        setLiveNeighbors(cell, 5);
		expect(cell.evolve()).toBeFalsy();
		var deadLifeCell = new LifeCell(false);
        setLiveNeighbors(deadLifeCell, 4);
		expect(deadLifeCell.evolve()).toBeFalsy();
	});

    function setLiveNeighbors(cell, count){
        var neighbors = cell.getNeighbors(); 
        neighbors.length=0;
        for(var i=0; i<count; i++){
            neighbors.push(new LifeCell(true));
        }
    }

});
});
