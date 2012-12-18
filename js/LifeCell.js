function LifeCell(initialState) {
	var neighbors = new Array();
	var lifeStatus = false;
	if(initialState){
		lifeStatus = true;
	}
    this.getNeighbors = function() { return neighbors; };
    this.evolve = function() {
        var count=this.countLiveNeighbors();
        if(count == 2){
            return lifeStatus;
        }
        if(count == 3){
            return true;
        }
        return false;
    };

    this.countLiveNeighbors = function() {
        var count=0;
        for(var i = 0; i<neighbors.length; i++){
            if(neighbors[i].isAlive()){
                count++;
            }
        }
        return count;
    };

    this.kill = function() {
        lifeStatus = false;
    };
    this.revive = function() { 
        lifeStatus = true;
    };
    this.isAlive = function(){ return lifeStatus };
    this.draw  = function() {
        if(lifeStatus){
            return " 1 ";
        }else{
            return " 0 ";
        }
    }
}
