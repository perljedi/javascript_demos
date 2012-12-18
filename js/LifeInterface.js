var showCounts = false;
function drawBoard(){
    var cvs = document.getElementById("board");
    cvs.width = gameBoard.getWidth()*25;
    cvs.height = gameBoard.getHeight()*25;
    var ctx = cvs.getContext("2d");
    for(var c=0; c<gameBoard.getWidth(); c++){
        for(var r=0; r<gameBoard.getHeight(); r++){
            ctx.font = '10px Arial';
            if(gameBoard.getCell(c,r).isAlive()){
                ctx.fillStyle = "#ff0000";
            }else{
                ctx.fillStyle = "#0000ff";
            }
            ctx.fillRect(c*25, r*25, 25, 25);
            if(showCounts){
                ctx.fillStyle="#00ff00";
                ctx.fillText(gameBoard.getCell(c,r).countLiveNeighbors(), (c*25)+12, (r*25)+12);
            }
        }
    }
    $("#itteration").html(gameBoard.itteration());
}

var bgjob=null;

var gameBoard;

$(document).ready(function(){
        $("#showCount").button();
        init();
        $("#board").click(toggleCell);
        $("#canvasContainer")
            .resizable({grid:25,
                minWidth: 104,
                minHeight: 104,
                stop: function(ev,ui){

                    var nWidth = Math.round((ui.size.width)/25);
                    var nHeight = Math.round((ui.size.height)/25);
                    alert(nWidth+"="+ui.size.width);
                    alert(nHeight+"="+ui.size.height);
                    $("#cellWidth").val(nWidth);
                    gameBoard.setWidth(nWidth);
                    $("#cellHeight").val(nHeight);
                    gameBoard.setHeight(nHeight);
                    drawBoard();
                }
            });
        $("#cellWidth").bind("change", function(){  
            gameBoard.setWidth(this.value);
            drawBoard();
            $("#canvasContainer").width(this.value*25);
        });
        $("#cellHeight").bind("change", function(){  
            gameBoard.setHeight(this.value);
            drawBoard();
            $("#canvasContainer").height(this.value*25);
        });
        $("#step_button").click(runItteration);
        $("#run_button").click(toggleAnimation);
        $("#random_button").click(randomizeBoard);
        $("#clear_button").click(clearBoard);
        $("#showCount").button().click(function(){
            showCounts=!showCounts;
            drawBoard();
        });
        $(document).bind("keypress", keypress_animate);
});


function init(){
    gameBoard = new LifeBoard(10, 10);
    drawBoard();
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
        drawBoard();
}

function clearBoard(){
    for(var co=0; co<gameBoard.cells.length; co++){
                gameBoard.cells[co].isAlive=false;
    }
        gameBoard.itteration=0;
    drawBoard();
}


function toggleCell(e){
        var lx=e.offsetX;
        var ly=e.offsetY;
        var c = (lx-(lx%25))/25;
        var r = (ly-(ly%25))/25;
        var mCell = gameBoard.getCell(c,r);
        if(mCell.isAlive()){
            mCell.kill();
        }else{
            mCell.revive();
        }
        drawBoard();
}

function runItteration(){
    gameBoard.evolve();
    drawBoard();
}

