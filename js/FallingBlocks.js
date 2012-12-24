jQuery.noConflict();
var Blocks = new Array();
var BlockLayout = new Array();
BlockLayout[0] = new Array(new Array(
                         new Array(3,2),
                         new Array(1,1),
                         new Array(2,1),
                         new Array(2,2),
                         new Array(3,2)),
            new Array(
                         new Array(2,3),
                         new Array(2,1),
                         new Array(2,2),
                         new Array(1,2),
                         new Array(1,3))
            );
BlockLayout[1] = new Array(new Array(
                         new Array(3,2),
                         new Array(2,1),
                         new Array(3,1),
                         new Array(2,2),
                         new Array(1,2)),
            new Array(
                         new Array(2,3),
                         new Array(1,1),
                         new Array(1,2),
                         new Array(2,2),
                         new Array(2,3))
            );
BlockLayout[2] = new Array(new Array(
                         new Array(2,2),
                         new Array(1,1),
                         new Array(1,2),
                         new Array(2,1),
                         new Array(2,2))
								   );
BlockLayout[3] = new Array(new Array(
                         new Array(2,3),
                         new Array(1,1),
                         new Array(1,2),
                         new Array(1,3),
                         new Array(2,3)),
            new Array(
                         new Array(3,2),
                         new Array(1,1),
                         new Array(1,2),
                         new Array(2,1),
                         new Array(3,1)),
            new Array(
                         new Array(2,3),
                         new Array(1,1),
                         new Array(2,1),
                         new Array(2,2),
                         new Array(2,3)),
            new Array(
                         new Array(3,2),
                         new Array(3,1),
                         new Array(1,2),
                         new Array(2,2),
                         new Array(3,2))
            );
BlockLayout[4] = new Array(new Array(
                         new Array(2,3),
                         new Array(1,3),
                         new Array(2,2),
                         new Array(2,3),
                         new Array(2,1)),
            new Array(
                         new Array(3,2),
                         new Array(1,1),
                         new Array(1,2),
                         new Array(2,2),
                         new Array(3,2)),
            new Array(
                         new Array(2,3),
                         new Array(1,1),
                         new Array(2,1),
                         new Array(1,2),
                         new Array(1,3)),
            new Array(
                         new Array(3,2),
                         new Array(1,1),
                         new Array(2,1),
                         new Array(3,1),
                         new Array(3,2))
            );
BlockLayout[5] = new Array(new Array(
                         new Array(1,4),
                         new Array(1,1),
                         new Array(1,2),
                         new Array(1,3),
                         new Array(1,4)),
            new Array(
                         new Array(4,1),
                         new Array(1,1),
                         new Array(2,1),
                         new Array(3,1),
                         new Array(4,1))
            );
BlockLayout[6] = new Array(new Array(
                         new Array(3,2),
                         new Array(2,1),
                         new Array(1,2),
                         new Array(2,2),
                         new Array(3,2)),
            new Array(
                         new Array(2,3),
                         new Array(1,1),
                         new Array(1,2),
                         new Array(2,2),
                         new Array(1,3)),
            new Array(
                         new Array(3,2),
                         new Array(1,1),
                         new Array(2,1),
                         new Array(2,2),
                         new Array(3,1)),
            new Array(
                         new Array(2,3),
                         new Array(1,2),
                         new Array(2,1),
                         new Array(2,2),
                         new Array(2,3))
            );
var pValues = new Array(0, 40, 100, 300, 1200);
var levelSpeed = new Array(1000, 
                           1000, 950, 900, 850, 800,
                            780, 760, 740, 720, 700, 
                            680, 660, 640, 620, 600,
                            590, 580, 570, 560, 550,
                            540, 530, 520, 510, 500);
var Board = new Array();
var score = 0;
var lines = 0;
var level = 0;
var cOrient = 0;
var cHeight = 0;
var cLeft   = 6;
var cBlock;
var nextBlock;
var myi;
var cbNumber;
var nbNumber;
var paused=true;
function moveBlocks(){
	drawBoard();
	if((BlockLayout[cbNumber][cOrient][0][1] + cHeight) > 19){ 
		newBlock();
		return;
	}
	if(! checkMove(cHeight+1, cLeft, cOrient)){
		if(cHeight < 0){
			alert("Game Over");
		}else{
			newBlock();
			return;
		}
	}else{
		cBlock.animate({top:"+=25"}, 200);
		cHeight++;
	}
}

function checkMove(top, left, orient){
	for(var i = 1; i<5; i++){
		var x = BlockLayout[cbNumber][orient][i][0] + left - 1;
		var y = BlockLayout[cbNumber][orient][i][1] + top - 1;
		if(x >= 0 && y >= 0){
			if(Board[y][x] > 0){
				return false;
			}
		}
		if(x > 13 || y > 19){
			return false;
		}
	}
	return true;
}

function newBlock(){
	for(var i = 1; i<5; i++){
		var x = BlockLayout[cbNumber][cOrient][i][0] + cLeft - 1;
		var y = BlockLayout[cbNumber][cOrient][i][1] + cHeight - 1;
		Board[y][x] = cbNumber + 1;
	}
	checkForLines();
	cBlock.detach();
	drawBoard();
	cbNumber = nbNumber;
	Blocks[cbNumber].hide("slide");
	var blid = 'bl_'+Math.floor(Math.random() * 1234567);
	cOrient = 0;
	cHeight = 1 - BlockLayout[cbNumber][cOrient][0][1];
	cLeft = 7;
	var offt = 15 + (25*cHeight);
	jQuery("body").append("<div id='"+blid+"' style='position:absolute;top:"+offt+"px;left:200px;z-index:4;width:100px;height:100px;'></div>");
	cBlock = jQuery("#"+blid);
	var bc = cbNumber+1;
	for(var i = 1; i<5; i++){
		var x = 25 * (BlockLayout[cbNumber][cOrient][i][0] - 1);
		var y = 25 * (BlockLayout[cbNumber][cOrient][i][1] - 1);
		drawBlock(cBlock, y, x, bc);
	}
	nbNumber = Math.floor(Math.random()*7);
	Blocks[nbNumber].show("drop");
	nextBlock = Blocks[nbNumber]; 	
}

function checkForLines(){
	var fullLines = new Array();
	for(var i = 19; i>=0; i--){
		if(jQuery.inArray(0, Board[i]) >= 0){
			//alert(Board[i].join(","));
		}else{
			fullLines.unshift(i);
		}
	}
	scorePoints(fullLines.length);
	lines += fullLines.length;
	while(lines >= 10 * level){
		level++;
		document.getElementById("level").innerHTML = level;
		clearInterval(myi);
		myi = setInterval(moveBlocks, levelSpeed[level]);
	}
	for(var i=0; i< fullLines.length; i++){
		Board.splice(fullLines[i],1);
		Board.unshift(new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0));
	}
	document.getElementById("lines").innerHTML = lines;
}

function scorePoints(num){
	score += pValues[num] * level;
	document.getElementById("score").innerHTML = score;
}

jQuery("document").ready(function(){
	Blocks[0] = jQuery("#block1");	
	Blocks[1] = jQuery("#block2");	
	Blocks[2] = jQuery("#block3");	
	Blocks[3] = jQuery("#block4");	
	Blocks[4] = jQuery("#block5");	
	Blocks[5] = jQuery("#block6");	
	Blocks[6] = jQuery("#block7");
	jQuery("div.button").button();
});

function addBlock(b,a){
	var bl = BlockLayout[b][a];
	var mbo = jQuery(".board");
	for(var i=1; i<5; i++){
		var x = bl[i][0]-1;
		var y = bl[i][1]-1;
		drawBlock(mbo, x, y, b+1);
	}
}

function startGame(){
	Board = new Array(20);
	for(var r=0; r<20; r++){
		Board[r] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	}
	drawBoard();
	jQuery("#ngb").hide("explode");
	jQuery("#hsb").hide("explode");
	if(cBlock){
		cBlock.remove();
		cBlock = null;
	}
	cbNumber = Math.floor(Math.random()*7);
	var blid = 'bl_'+Math.floor(Math.random() * 1234567);
	cOrient = 0;
	level = 1;
	cHeight = 1 - BlockLayout[cbNumber][cOrient][0][1];
	var offt = 15 + (25*cHeight);
	jQuery("body").append("<div id='"+blid+"' style='position:absolute;top:"+offt+"px;left:175px;z-index:4;width:100px;height:100px;'></div>");
	cBlock = jQuery("#"+blid);
	drawShape();
	nbNumber = Math.floor(Math.random()*7);
	if(nextBlock){
		nextBlock.hide("puff");
	}
	Blocks[nbNumber].show("drop");
	nextBlock = Blocks[nbNumber]; 
	document.onkeydown = shiftBlock;
	paused=false;
	myi = setInterval(moveBlocks, 1000);
}

function drawShape(){
	cBlock.empty();
	var bc = cbNumber+1;
	for(var i = 1; i<5; i++){
		var x = 25 * (BlockLayout[cbNumber][cOrient][i][0] - 1);
		var y = 25 * (BlockLayout[cbNumber][cOrient][i][1] - 1);
		drawBlock(cBlock, y, x, bc);
	}
}

function shiftBlock(event){
	if(event.keyCode == 32){
		if(! paused){
			jQuery("#gpmodal").dialog({position:'center',
												modal:true,
												height:"3px",
												title:"<span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>PAUSED",
												close:
													function () {
				 										myi = setInterval(moveBlocks, levelSpeed[level]);
														paused = false;
												}});
			clearInterval(myi);
			paused = true;
		}
		return;
	}
	if(paused){
		return;
	}
	if(event.keyCode == 37){
		if(cLeft > 0 && checkMove(cHeight, cLeft - 1, cOrient)){
			cBlock.animate({left:"-=25"}, 10);
			cLeft--;
		}
	}else	if(event.keyCode == 39){
		if((cLeft + BlockLayout[cbNumber][cOrient][0][0]) < 14 && checkMove(cHeight, (cLeft + 1), cOrient)){
			cBlock.animate({left:"+=25"}, 10);
			cLeft++;
		}
	}else if(event.keyCode == 38){
		if((cOrient + 1) < BlockLayout[cbNumber].length){
			if(checkMove(cHeight, cLeft, (cOrient + 1))){
				cOrient++;
			}else{
				return;
			}
		}else{
			if(checkMove(cHeight, cLeft, 0)){
				cOrient = 0;
			}else{
				return;
			}
		}
		drawShape();
	}else if(event.keyCode == 40){
//		clearInterval(myi);
		moveBlocks();
//		myi = setInterval(moveBlocks, levelSpeed[level]);
	}else{
		//alert(event.keyCode);
	}
}

function drawBoard(){
	var mbo = jQuery(".board");
	mbo.empty();
	for(var row=19; row>=0; row--){
		for(var col=0; col<14; col++){
			if(Board[row][col] > 0){
				var plo = 25*col;
				var pto = 25*row;
				drawBlock(mbo, pto, plo, Board[row][col]);
			}
		}
	}
}

function drawBlock(mbo, pto, plo, val){
	mbo.append("<span class='ui-corner-all block b"+val+"' style='position:absolute;top:"+pto+"px;left:"+plo+"px;'><img src='/images/spacer.gif' class='ui-corner-all block'></span>");
}
