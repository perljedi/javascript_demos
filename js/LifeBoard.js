LifeBoard = function(cols, rows) {
	var currentItteration=0;
    var width= cols ? cols : 6;
    var height= rows ? rows : 6;
    var grid = [];

    this.getWidth = function(){
       return width;
    };
    
    this.getHeight = function(){
        return height;
    };

    this.itteration = function(){
        return currentItteration;
    };

    this.setWidth = function(newWidth){
        if(newWidth < width){
            grid.length=newWidth;
        }else{
            for(var c=width; c<newWidth; c++){
                var column = [];
                for(var r=0; r<height; r++){
                    var nCell = new LifeCell();
                    column.push(nCell);
                }
                grid.push(column);
            }
        }
        width=newWidth;
        this.populateNeighbors();
    };

    this.setHeight = function(newHeight) {
        for(var c=0; c<width; c++){
            if(newHeight < height){
                grid[c].length=newHeight;
            }else{
                for(var r=height; r<newHeight; r++){
                    grid[c].push(new LifeCell());
                }
            }
        }
        height=newHeight;
        this.populateNeighbors();
    };

    this.getCell = function(x,y){
        if(x < 0){
            x=width-1;
        }else if(x >= width){
            x=0;
        }
        if(y < 0){
            y=height-1;
        }else if(y >= height){
            y=0;
        }
        return grid[x][y];
    };
    for(var c=0; c<width; c++){
        var column = [];
        for(var r=0; r<height; r++){
            var nCell = new LifeCell();
            column.push(nCell);
        }
        grid.push(column);
    }
    this.populateNeighbors = function() {
        for(var c=0; c<width; c++){
            for(var r=0; r<height; r++){
                grid[c][r].getNeighbors().length=0;
                for(var rc=-1; rc<2; rc++){
                    for(var rh=-1; rh<2; rh++){
                        if(! (rh === 0 && rc === 0)){
                            grid[c][r].getNeighbors().push(this.getCell(c+rc, r+rh));
                        }
                    }
                }
            }
        }
    };
    this.populateNeighbors();
    this.evolve = function() {
        currentItteration++;
        var nextState = [];
        var cells = this.getCells();
        while(cells.hasMore()){
            var mc = cells.getNext();
            nextState.push([mc.evolve(), mc]);
        }
        for(var i=0; i<nextState.length; i++){
            if(nextState[i][0]){
                nextState[i][1].revive();
            }else{
                nextState[i][1].kill();
            }
        }

        return true;
    };
    this.clear = function() {
        var cells = this.getCells();
        while(cells.hasMore()){
            cells.getNext().kill();
        }
        currentItteration = 0;
    };

    this.getCells = function() {
        var r = 0;
        var c = 0;
        return {hasMore:function(){ if(c<width && r<height){ return true; } },
                getNext:function(){ 
                    var col=grid[c]; 
                    if(! col){ return null; } 
                    var el = col[r]; 
                    if(++r == height){ c++; r=0; } 
                    return el; 
                }};
    };
    this.randomize = function(){
        var cells = this.getCells();
        while(cells.hasMore()){
            if(Math.random()*100 < 33){
                cells.getNext().revive();
            }else{
                cells.getNext().kill();
            }
        }
        currentItteration = 0;
    };
};

LifeBoard.prototype.isA = function(){
    return "LifeBoard";
};
