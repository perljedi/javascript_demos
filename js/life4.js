function GameBoard(columns, rows, boardElement){
        this.width=columns;
        this.height=rows;
        this.element=boardElement;
        this.cells = new Array();
        this.grid = new Array();
        for(var c=0; c<this.width; c++){
                this.grid[c]=new Array();
                for(var r=0; r<this.height; r++){
                        var cell = new Cell(c,r,this);
                        this.grid[c][r]=cell;
                        this.cells.push(cell);
                }
        }
}
GameBoard.prototype.resize = function(newWidth, newHeight){
        var oWidth  = this.width;
        var oHeight = this.height;
        var nCells=new Array();
        var nGrid=new Array();
        for(var c=0; c<newWidth; c++){
                nGrid[c]=new Array();
                for(var r=0; r<newHeight; r++){
                        var cell = this.getCell(c,r);
                        if(! cell){
                                cell = new Cell(c,r,this);
                                cell.draw();
                        }
                        nGrid[c][r]=cell;
                        nCells.push(cell);
                }
                if(newHeight < this.height){
                        for(var r=newHeight; r< this.height; r++){
                                this.grid[c][r].element.remove();
                        }
                }
        }
        if(newWidth<this.width){
                for(var c=newWidth; c<this.width; c++){
                        for(var r=0; r<this.height; r++){
                                this.grid[c][r].element.remove();
                        }
                }
        }
        this.grid=nGrid;
        this.cells=nCells;
        this.width=newWidth;
        this.height=newHeight;
}
GameBoard.prototype.getCell = function(column, row){
        if(column >= 0 && column < this.width && row >=0 && row<this.height){
                return this.grid[column][row];
        }
        return;
}
GameBoard.prototype.draw = function(){
        for(var c=0; c<this.cells.length; c++){
                this.cells[c].draw();
        }
}
GameBoard.prototype.getCurrentState = function(){
        var state = new Array();
        for(var c=0; c<this.width; c++){
                state[c] = new Array();
                for(var r=0; r<this.height; r++){
                        state[c][r]=this.getCell(c,r).countLiveNeighbors();
                }
        }
        return state;
}

function Cell(column, row, board){
        this.board=board;
        this.column=column;
        this.row=row;
        this.isAlive=false;
        if(column>1 && column<4 && row>1 && row<4){
                this.isAlive = true;//Math.random() > 0.5;
        }
        var tpos = (15+(this.row*25));
        var lpos = (15+(this.column*25));
        this.element=$("<div class='block' style='z-index:5;position:absolute;top:"+tpos+";left:"+lpos+"'></div>");
        this.element.data("column", this.column);
        this.element.data("row", this.row);
        board.element.append(this.element);
}
Cell.prototype.setLive = function(newState){
        this.isAlive=newState;
}
Cell.prototype.countLiveNeighbors = function(){
        var count=0;
        for(var c=-1; c<2; c++){
                for(var r=-1; r<2; r++){
                        var neighbor=this.board.getCell(this.column-c, this.row-r);
                        if(neighbor && neighbor.isAlive){
                                count++;
                        }
                }
        }
        return count;
}
Cell.prototype.getRow = function(){return this.row;}
Cell.prototype.getColumn = function(){return this.column;}
Cell.prototype.draw = function(){
        if(this.isAlive){
                this.element.removeClass("b2");
                this.element.addClass("b1");
                //$("#board").append("<span class='block b1' style='z-index:5;top:"+this.row*25+";left:"+this.column*50+"'></span>");
        }else{
                this.element.addClass("b2");
                this.element.removeClass("b1");
                //$("#board").append("<span class='block b2' style='z-index:5;top:"+this.row*25+";left:"+this.column*50+"'></span>");
        }
}

var bgjob=null;

var gameBoard;
jQuery('document').ready(function(){
        $("#cellWidth").spinner({min:4,max:200, change:setBoardSize});
        $("#cellHeight").spinner({min:4,max:200, change:setBoardSize});
        $("#gameSpeed").spinner({min:1, max:200});
        gameBoard = new GameBoard(10, 10, $("#board"));
        setBoardSize();
        gameBoard.draw();
        $("div.block").live("click", function(){
                        var row=$(this).data("row");
                        var column = $(this).data("column");
                        var cell=gameBoard.getCell(column,row);
                        if(cell.isAlive){
                                cell.setLive(false);
                        }else{
                                cell.setLive(true);
                        }
                        cell.draw();
        });
        $("#step_button").click(runItteration);
        $("#run_button").click(function(){
                if(bgjob){
                        clearInterval(bgjob);
                        bgjob=null;
                }else{
                        bgjob = setInterval(runItteration, 1000/$("#gameSpeed").spinner("value"));
                }
        });
});


function setBoardSize(){
        stopAnimation();
        var board=$("#board");
        gameBoard.resize($("#cellWidth").spinner("value"), $("#cellHeight").spinner("value"));
        board.width($("#cellWidth").spinner("value") * 25);
        board.height($("#cellHeight").spinner("value") * 25);
}

function stopAnimation(){
        if(bgjob){
                clearInterval(bgjob);
                bgjob=null;
        }
}
function runItteration(){
        var orig = gameBoard.getCell(0,0);
        var cState = gameBoard.getCurrentState();
        for(var i in gameBoard.cells){
                var cell=gameBoard.cells[i];
                if(cell.isAlive){
                        if(cState[cell.column][cell.row] < 3 || cState[cell.column][cell.row] > 4){
                                cell.isAlive=false;
                        }
                }else{
                        if(cState[cell.column][cell.row] == 3){
                                cell.isAlive=true;
                        }
                }
        }
        gameBoard.draw();
}

