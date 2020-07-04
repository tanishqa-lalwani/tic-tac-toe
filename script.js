var  board;
var o_mark='O';
var x_mark ='X';

const win = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,4,8],
	[1,4,7],
	[0,3,6],
	[2,5,8],
	[6,4,2]
]

const boxes = document.querySelectorAll('.box');
const winDisplay = document.getElementById('winner');
const display = document.getElementById('winning-text');
startGame();
let circle;
var count=0;
function startGame() {
	board= Array.from(Array(9).keys());
	for( var i=0 ; i< boxes.length ; i++) {
		boxes[i].innerText = '';
		boxes[i].style.removeProperty('background-color');
		boxes[i].addEventListener('click' , turnClick,false);
	}
}

let draw=false;
function turnClick(cell) {
	const playerid= cell.target.id;
	const current = circle ? o_mark : x_mark;
	board[playerid]=current;
	count++;
	document.getElementById(playerid).innerText=current;
	swapTurns();
	var winner = checkWin(current);
	if(winner!=-1 || count >=9) {
		console.log("winner "+ current + " : "+ draw);
		console.log(count);
		end(current,winner);
	}
}

function swapTurns() {
	circle = !circle;
	}

function checkWin(current) {

	for(var i=0; i< win.length ; i++) {
		if(board[win[i][0]] == current && board[win[i][1]] == current  && board[win[i][2]] == current) {
			return i;
			}
		}
			return -1;
	
}

function end(player,pos) {
	for( var i=0 ; i< boxes.length ; i++) {
		boxes[i].removeEventListener('click' , turnClick);
	}

	if(pos!=undefined && pos===-1){
		setTimeout(function() {alert('Draw game');; }, 1000);


	}else{
		
		for (var i = 0; i < 3; i++) {
			var p = win[pos][i];
			boxes[p].classList.add("blink");
		}
		setTimeout(function() {alert(player + ' wins' + win[pos][0] + win[pos][1] + win[pos][2]);; }, 2000);

		

	}
} 

