var  board;
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
const ai = 'O';
const human = 'X';
var current;
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
	if(board[cell.target.id] !== ai && board[cell.target.id] !== human) {
		turn(cell.target.id,human);
		let winner = checkWin();
		//if(winner !== human && winner !== "tie")
			//turn(bestMove(),ai);

	}
	/*if(winner!=-1 || count >=9) {
		console.log("winner "+ current + " : "+ draw);
		console.log(count);
		end(current,winner);
	}*/
}

let scores = {
	X : 1,
	O : -1,
	draw : 0
};
function turn(cellId,player) {
	board[cellId]=player;
	document.getElementById(cellId).innerText = player	;
	let winner = checkWin();
	if(winner === player)
		end(player,0);

}

function bestMove() {
	let bestScore = -1000;
	let move ; 	
	for( var i=0 ; i< board.length ; i++) {
			if(board[i] !== 'X' && board[i] !== 'O')	
				board[i]=ai;
				let score = minimax(board,0,false);
				console.log(score);
			if(score > bestScore) {
				bestScore = score;
				move = i ;
			}
		}
	
	board[move] = ai;
	return move;
}

function minimax(board,depth,isMax) {
	let check = checkWin();
	if(check !== null) {
		return scores[check];
	}

	if(isMax) {
		let bestScore = -1000;
		for( var i=0 ; i< board.length ; i++) {
			if(board[i] !== human && board[i] !== ai) {//available
				board[i]=ai;
				let score = minimax(board,depth + 1,false);
				bestScore = Math.max(score,bestScore);	
			}
		}
		return bestScore;
	} 
	else {
		let bestScore = 1000;
		for( var i=0 ; i< board.length ; i++) {
			if(board[i] !== 'X' && board[i] !== 'O') {//available
				board[i]=human;
				let score = minimax(board,depth + 1,true);
				bestScore = Math.min(score,bestScore);	
			}
		}
		return bestScore;
	}

}
/*function swapTurns() {
	current = ! current;
	}*/

function checkWin() {
	let winner = null;
	let count = 0;
	let ai = 'O';
	let human = 'X';
	for(var i=0; i< win.length ; i++) {
		if(board[win[i][0]] == ai && board[win[i][1]] == ai  && board[win[i][2]] == ai) {
			winner = ai;
			}
	}

	if(winner === null) {
		for(var i=0; i< win.length ; i++) {
			if(board[win[i][0]] == human && board[win[i][1]] == human  && board[win[i][2]] == human) {
				winner = human;
				}
		}
	}

	// check tie
	for(var i=0; i< board.length ; i++) {
		if(board[i] === ai || board[i] === human) {
			count++;
			}
	}

	if(count === 9 && winner === null)
		return "tie";
	else
		return winner;



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

