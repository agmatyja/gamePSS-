document.addEventListener("DOMContentLoaded", function(event) { 

/* REFERENCJE DO HTML-A */


var params;

function reset() {
	params = {
		player: { score: 0, choice: '' },
		computer: { score: 0, choice: '' },
		round: 0,
		maxRound: 10,
		progress: []
	};
	outputResult.innerHTML =  '';
	outputScore.innerHTML =  '';
	outputLastScore.innerHTML = '';
}
reset();


/* NASŁUCHIWACZE */
var choice = document.querySelectorAll('.player-move');	
for(var i = 0; i < choice.length; i++){
	choice[i].addEventListener('click',function (event) {
		var elem = event.target;
		var atr = elem.getAttribute("data-move");
		playerMove(atr);
	});
}


document.getElementById('newGame').addEventListener("click", function() {
  // var wiPro = window.prompt('Do you want to play again?');
  var maxR = parseInt (window.prompt('How many won rounds finishes game?')); 
  if (!isNaN(maxR)) {
	reset();
	params.maxRound = maxR;
  }
}); 


/* losowanie wyboru komputera */

function randComputerMove () {
  var choices = ['paper', 'rock', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

/* ruch gracza */
 
function playerMove (playerChoice) {
  if (params.round >= params.maxRound) {
    window.alert("Game over, please press the new game button!");
    return;
  }
  params.player.choice = playerChoice;
  params.computer.choice = randComputerMove();
  checkRoundWinner();
  refreshScore();
  
  return playerChoice;
  

}
/* sprawdz kto wygrał rundę */

function checkRoundWinner () {
  if(params.player.choice === params.computer.choice) {
    outputResult.innerHTML = 'Draw game: You played ' + params.player.choice + ' and computer played ' + params.computer.choice;
	return 'Draw game';
  }
  else if((params.player.choice === 'rock' && params.computer.choice === 'scissors') ||
          (params.player.choice === 'paper' && params.computer.choice === 'rock') ||
          (params.player.choice === 'scissors' && params.computer.choice === 'paper')) {
          params.player.score++;
          outputResult.innerHTML =  'You won: You played ' + params.player.choice + ' and computer played ' + params.computer.choice;
		  return 'You won';
  } 
  else {    
    params.computer.score++;
    outputResult.innerHTML = 'Computer won: You played ' + params.player.choice + ' and computer played ' + params.computer.choice;
	return 'Computer won';
  }
}

/* odświezą punkty w html-u */

function refreshScore () {
  params.round++;
  outputScore.innerHTML = 'Player ' + params.player.score + ':' 
    + params.computer.score + ' Computer, round ' + params.round + ' of ' 
    + params.maxRound;
  

  if (params.round === params.maxRound) {
    if (params.player.score !== params.computer.score) {
     outputLastScore.innerHTML = (params.player.score > params.computer.score ? 'YOU' : 'COMPUTER') + ' WON THE ENTIRE GAME!!!';
	
    }
    else {
      outputLastScore.innerHTML = 'NOBODY WON THE GAME!!!'
	  
    }
   document.querySelector('#modal-overlay').classList.add('show');
   document.querySelector('#modal-one').classList.add('show')
  } 
}
var showModal = function(event){
		event.preventDefault();
		var elem = event.target;
		var hre = elem.getAttribute("href");
		var eff = document.querySelector(hre);	
		var modals = document.querySelectorAll('.modal');
		for(var i = 0; i < modals.length; i++){
			modals[i].classList.remove('show');	
		}
		eff.classList.add("show");
		document.querySelector('#modal-overlay').classList.add('show');
	};
	
	
	var modalLinks = document.querySelectorAll('.show-modal');
	
	for(var i = 0; i < modalLinks.length; i++){
		modalLinks[i].addEventListener('click',showModal);
	}
	
	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
	 
	
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
	
	
	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
});