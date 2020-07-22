var board;

const pos = document.querySelectorAll(".pos");
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
  [6, 4, 2],
];

/const boxes = document.querySelectorAll(".box");/;
const winDisplay = document.getElementById("winner");
const display = document.getElementById("winning-text");
const ai = "O";
const human = "X";
const human_image = new Image();
  const ai_image = new Image();
//var pos = document.getElementsByClassName("pos");
let move;
var level;
var difficulty = document.getElementsByName('diff');
var charValue = localStorage.getItem("choose_char");



var current;
startGame();
checkDiff();
getValue();


function getValue() {
  if (charValue == "visa") {
    console.log("Hello");
  
  human_image.src = "https://media2.giphy.com/media/3oKIPlvyptnAzMFsYM/giphy.gif";
  ai_image.src = "https://media1.giphy.com/media/DZD6OikL9NHxK/giphy.gif";

  } else if (charValue == "mastercard") {
    human_image.src = "https://media1.giphy.com/media/DZD6OikL9NHxK/giphy.gif";
    ai_image.src = "https://media2.giphy.com/media/3oKIPlvyptnAzMFsYM/giphy.gif";
  }
}

function startGame() {

  document.getElementById("main-section").style.opacity = "";
  board = Array.from(Array(9).keys());
  //turn(easyAI(0),ai);

  pos.forEach(function(element){
    //pos[i].innerHTML =
     /* '<div><span class="pos-span"><span id="transpChars' +
      i +
      '"><span style="display: flex;"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon' +
       +
      '.png" style="width: 50px; margin: auto;"></span></span></span></div>';*/
    element.addEventListener('click',turnClick,false);
  });
 /* for (var i = 0; i < 9; i++) {
   

    
    
    /*boxes[i].innerText = "";
    boxes[i].style.removeProperty("background-color");*/
  
}

function checkDiff() {
  for(var i=0;i<difficulty.length;i++){
    if(difficulty[i].checked)
    level = difficulty[i].value;
  }
} 

function turnClick(cell) {
  console.log(board);
  console.log("Hi" + (this.id));

  if (board[this.id] !== ai && board[this.id] !== human)
    turn(this.id, human);
      console.log(level);
      var isWin= checkWin();

  if(level == "Easy"){
      if(isWin.count === 9 || isWin.winner !== null)
        end(isWin.winner,isWin.index);

      else
        turn(easyAI(countFilled()),ai);
    }

    else if(level == "Hard") {

        if(isWin.winner !== human)
        turn(bestMove(),ai);

        if(isWin.count === 9 || isWin.winner !== null)
        end(isWin.winner , isWin.index);
    }

    else if(level == "medium"){
      if(isWin.winner !== human)
        turn(MediumMove(),ai);

        if(isWin.count === 9 || isWin.winner !== null)
        end(isWin.winner , isWin.index);
    }
}


let scores = {
  X: -10,
  O: 10,
  tie: 0, 
};
function turn(cellId, player) {
  board[cellId] = player;
  var player_image = new Image();
  player_image =  player === ai ? ai_image : human_image;
  var x = document.getElementById(cellId);
 // pos[cellId].innerHTML = "<div  class='taken' id='div"+cellId+"'>'<img src=' "+ player_image + "'>'</div>";
  x.innerHTML = "<span style='display: flex;'><img src='"+player_image.src+"' style='width: 80px; margin: auto;'></span>";
  //pos[cellId].innerHTML = player_image
  /*x.setAttribute("width", "70");
  x.height = "20px";
  x.width = "70px";
  x.setAttribute("margin", "auto"); 
  x.setAttribute("height", "20px"); */
  //player_image.style.width = "85px";
  //player_image.style.height = "70px";

  //x.appendChild(player_image);
  //pos[cellId].innerHTML = "<div  class='taken' id='div"+cellId+"'> "+player+"  <span style='display: flex-column;'></span></div>";
  var ans;
  ans = checkWin();

  if (ans.winner == player || ans.count === 9) end(ans.winner, ans.index);
}



function bestMove() {
  let bestScore = -Infinity;
  for (var i = 0; i < board.length; i++) {
    if (board[i] !== ai && board[i] !== human) {
      board[i] = ai;
      let score = minimax(board, 0, false);
      board[i] = i;
      console.log(score);
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = ai;
  return move;
}

function MediumMove() {
    var cnt = countFilled();
    var availableIndex = [];
    var y=checkWin();
    
    if(y.winner !== null || y.count === 9)
    end(y.winner,y.index);
      
    for(i=0;i<board.length;i++){
      if(board[i]!== human && board[i]!== ai)
      availableIndex.push(i);
    }
    
     if(cnt <= 3){
      
      var index=(Math.floor(Math.random() * availableIndex.length));
      board[availableIndex[index]] = ai;
      return availableIndex[index];
    }
    
    else if(cnt>= 4){
      var index_o=check_nextMove_winner(ai);
      if(index_o === 9)
      {
        var index_x=check_nextMove_winner(human);
        
        if(index_x !== 9)
        {
          board[index_x]= ai;
          return index_x;
          }
        else{
          var index=(Math.floor(Math.random() * availableIndex.length));
          board[availableIndex[index]] = ai;
          return availableIndex[index];
        }
      }else{
         board[index_o]= ai;
        return index_o;
      }
    }
  

}

function check_nextMove_winner(player) {
  var cnt=0,index_empty=9,index=9;
  
  for(var i=0;i<board.length;i+=3)  //rows
  {
    cnt=0;
    index=9;
    for(var j=i;j <i+3;j++)
    {
      if(board[j] == player)
      cnt++;

      else if(board[j] == j)
      index=j;
    }
    if(cnt === 2 && index !== 9)
    {
       return index;
      }
  }
  
  for(var i=0;i<3;i++)   //columns
  {
    cnt=0;
    index=9;
    for(var j = i ; j<board.length; j+=3)
    {
      if(board[j] == player)
      cnt++;

      else if(board[j] == j)
      index=j;
      
    }
    if(cnt === 2 && index !== 9)
    {
       return index;
      }
  }
  
  index=9;
  cnt=0;
  for(var j=0;j<board.length;j+=4)   //diagonal 1
  {
    if(board[j] == player)
      cnt++;
    else if(board[j] == j)
      index=j;
  }
  if(cnt === 2 && index !== 9)
  {
      return index;
  }
  
  index=9;
  cnt=0;
  for(var j=2; j<7 ; j+=2)   //diagonal 2
  {
    if(board[j] == player)
      cnt++;
    else if(board[j] == j)
      index=j;
  }
  if(cnt === 2 && index !== 9)
  {
      return index;
  }
  
  return index_empty;
}
function easyAI(playcount){
  if(playcount < 9) {
    while(1){
      var index = (Math.floor(Math.random() * 9));
      if(board[index] === index  )
        return index;
    }
  }

}

function minimax(board, depth, isMax) { 
  var check = checkWin();
  if (check.winner !== null) {
    return scores[check.winner];
  }

  if (isMax) {
    let bestScore = -Infinity;
    for (var i = 0; i < board.length; i++) {
      if (board[i] !== human && board[i] !== ai) {
        //available
        board[i] = ai;
        let score = minimax(board, depth + 1, false);
        board[i] = i;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (var i = 0; i < board.length; i++) {
      if (board[i] !== human && board[i] !== ai) {
        //available
        board[i] = human;
        let score = minimax(board, depth + 1, true);
        board[i] = i;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function countFilled() {
  var count=0;
  for(var i=0; i< board.length ; i++) {
      if(board[i] === ai || board[i] === human) {
        count++;
        }
    }
    return count; 
}
function checkWin() {
  let index ;
  let winner = null;
  let count = 0;
  let ai = 'O';
  let human = 'X';
  for(var i=0; i< win.length ; i++) {
    if(board[win[i][0]] == ai && board[win[i][1]] == ai  && board[win[i][2]] == ai) {
      winner = ai;
      index = i;
      break;
      }
  }

  if(winner === null) {
    for(var i=0; i< win.length ; i++) {
      if(board[win[i][0]] == human && board[win[i][1]] == human  && board[win[i][2]] == human) {
        winner = human;
        index = i;
        break;
      }
    }
  }
  
  // check tie
  count = countFilled();
  

  if(count === 9 && winner === null){
    winner = 'tie';
    return {winner,count};
  }
  else
    return {winner,index};



}

function end(player,position) {
  for( var i=0 ; i< pos.length ; i++) {
    pos[i].removeEventListener('click' , turnClick);
  }

  if(position=== undefined){
    setTimeout(function() {alert('Draw game');; }, 1000);


  }else{
    
    for (var i = 0; i < 3; i++) {
      var p = win[position][i];
      pos[p].classList.add("blink");
    }
    setTimeout(function() {alert(player + ' wins' + win[position][0] + win[position][1] + win[position][2]);; }, 2000);

    

  }
} 
