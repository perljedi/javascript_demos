function GameBoard(columns, rows){
    this.cvs = document.getElementById("board");
        this.ctx = this.cvs.getContext("2d");
    this.width=columns;
    this.height=rows;
    this.cells = new Array();
    this.grid = new Array();
        this.itteration=0;
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
    this.cvs.width=newWidth*25;
        this.cvs.height=newHeight*25;
        for(var c=0; c<newWidth; c++){
        nGrid[c]=new Array();
        for(var r=0; r<newHeight; r++){
            var cell = this.getCell(c,r);
            if(! cell){
                cell = new Cell(c,r,this);
            }
            nGrid[c][r]=cell;
            nCells.push(cell);
        }
    }
        this.itteration=0;
    this.grid=nGrid;
    this.cells=nCells;
    this.width=newWidth;
    this.height=newHeight;
        this.draw();
}
GameBoard.prototype.getCell = function(column, row){
    if(column >= 0 && column < this.width && row >=0 && row<this.height){
        return this.grid[column][row];
    }
    return;
}
GameBoard.prototype.draw = function(){
    for(var c=0; c<this.cells.length; c++){
        this.cells[c].draw(this.ctx);
    }
        $("#itteration").html(this.itteration);
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
    this.isAlive = Math.random() < 0.22;
    this.myY = this.row*25;
    this.myX = this.column*25;
}
Cell.prototype.setLive = function(newState){
    this.isAlive=newState;
}
Cell.prototype.countLiveNeighbors = function(){
    var count=0;
    for(var c=-1; c<2; c++){
                var col = this.column+c;
                if(col < 0){
                        col=gameBoard.width-1;
                }else if(col >= gameBoard.width){
                        col=0;
                }
        for(var r=-1; r<2; r++){
                        var ro = this.row+r;
                        if(ro < 0){
                                ro = gameBoard.height-1;
                        }else if(ro >= gameBoard.height){
                                ro = 0;
                        }
            var neighbor=this.board.getCell(col, ro);
            if(neighbor && neighbor.isAlive){
                count++;
            }
        }
    }
    return count;
}

Cell.prototype.getRow = function(){return this.row;}
Cell.prototype.getColumn = function(){return this.column;}
Cell.prototype.draw = function(ctx){
    if(this.isAlive){
                ctx.fillStyle = "#ff0000";
    }else{
                ctx.fillStyle = "#0000ff";
    }
        ctx.fillRect(this.myX, this.myY, 25, 25);
}

var bgjob=null;

var gameBoard;

$(document).ready(function(){
        init();
        $("#board").click(toggleCell);
        $("#board").bind("mousedown", beginPaint);
        $("#cellWidth").bind("change", function(){  gameBoard.resize(this.value, gameBoard.height);});
        $("#cellHeight").bind("change", function(){  gameBoard.resize(gameBoard.width, this.value);});
        $("#step_button").click(runItteration);
        $("#run_button").click(toggleAnimation);
        $("#random_button").click(randomizeBoard);
        $("#clear_button").click(clearBoard);
        $(document).bind("keypress", keypress_animate);
});

function beginPaint(){

}

function init(){
    gameBoard = new GameBoard(10, 10);
    gameBoard.draw();
}

function keypress_animate(e){
        if(e.which == 32){
                toggleAnimation();
        }else if(e.which == 46){
                runItteration();
        }
}

function toggleAnimation(){
        if(bgjob){
                clearInterval(bgjob);
                bgjob=null;
        }else{
                var itteration_per_second = 40;
                if($("#gameSpeed") && $("#gameSpeed").val()){
                        itteration_per_second = $("#gameSpeed").val();
                }
                bgjob=setInterval(runItteration, 4000/itteration_per_second);
        }
}

function randomizeBoard(){
        gameBoard.itteration=0;
        for(var co=0; co<gameBoard.cells.length; co++){
                if(Math.random() < 0.22){
                        gameBoard.cells[co].isAlive=true;
                }else{
                        gameBoard.cells[co].isAlive=false;
                }
        }
        gameBoard.draw();
}

function clearBoard(){
    for(var co=0; co<gameBoard.cells.length; co++){
                gameBoard.cells[co].isAlive=false;
    }
        gameBoard.itteration=0;
    gameBoard.draw();
}


function toggleCell(e){
        var lx=e.offsetX;
        var ly=e.offsetY;
        var c = (lx-(lx%25))/25;
        var r = (ly-(ly%25))/25;
        var mCell = gameBoard.getCell(c,r);
        mCell.isAlive= !mCell.isAlive;
        gameBoard.draw();
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
        gameBoard.itteration++;
    gameBoard.draw();
}

