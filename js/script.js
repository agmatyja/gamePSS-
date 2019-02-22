document.addEventListener("DOMContentLoaded", function(event) { 

/* REFERENCJE DO HTML-A */

var paperBtn = document.getElementById('paperBtn');
var rockBtn = document.getElementById('rockBtn');
var scissorsBtn = document.getElementById('scissorsBtn');
var newGameBtn = document.getElementById('newGame');
var output = document.getElementById('output');

var player;
var computer;
var round;
var maxRound;
/* NASŁUCHIWACZE */

paperBtn.addEventListener("click", function() { playerMove('paper') })
rockBtn.addEventListener("click", function() { playerMove('rock') })
scissorsBtn.addEventListener("click", function() { playerMove('scissors') })

function reset() {
  player = { score: 0, choice: '' };
  computer = { score: 0, choice: '' };

  round = 0;
  maxRound = 10;// 
  outputResult.innerHTML =  '';
  outputScore.innerHTML =  '';
  outputLastScore.innerHTML = '';
}
reset();


newGameBtn.addEventListener("click", function() {
  // var wiPro = window.prompt('Do you want to play again?');
  var maxR = parseInt (window.prompt('How many won rounds finishes game?')); 
  if (!isNaN(maxR)) {
  reset();
  maxRound = maxR;
  }
}); 


/* losowanie wyboru komputera */

function randComputerMove () {
  var choices = ['paper', 'rock', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

/* ruch gracza */
 
function playerMove (playerChoice) {
  if (round >= maxRound) {
    window.alert("Game over, please press the new game button!");
    return;
  }
  player.choice = playerChoice;
  computer.choice = randComputerMove();
  checkRoundWinner();
  refreshScore();
  return playerChoice;
  

}
/* sprawdz kto wygrał rundę */

function checkRoundWinner () {
  if(player.choice === computer.choice) {
    outputResult.innerHTML = 'Draw game: You played ' + player.choice + ' and computer played ' + computer.choice;
  }
  else if((player.choice === 'rock' && computer.choice === 'scissors') ||
          (player.choice === 'paper' && computer.choice === 'rock') ||
          (player.choice === 'scissors' && computer.choice === 'paper')) {
          player.score++;
          outputResult.innerHTML =  'You won: You played ' + player.choice + ' and computer played ' + computer.choice;
  } 
  else {    
    computer.score++;
    outputResult.innerHTML = 'Computer won: You played ' + player.choice + ' and computer played ' + computer.choice;
  }
}

/* odświezą punkty w html-u */

function refreshScore () {
  round++;
  outputScore.innerHTML = 'Player ' + player.score + ':' 
    + computer.score + ' Computer, round ' + round + ' of ' 
    + maxRound;
  

  if (round === maxRound) {
    if (player.score !== computer.score) {
     outputLastScore.innerHTML = (player.score > computer.score ? 'YOU' : 'COMPUTER') + ' WON THE ENTIRE GAME!!!';
    }
    else {
      outputLastScore.innerHTML = 'NOBODY WON THE GAME!!!'
    }
   
  } 
}
});