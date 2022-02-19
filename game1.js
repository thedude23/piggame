var scores, roundScore, activePlayer, gamePlaying; //at the beginning we always write the variables needed for later; we can define them later

$('.btn btn-danger').hide('wrapper clearfix'); // **********

init(); // 0. we start the game (we could also name this function "startGame" or something)


// 1. when game starts, we want the following things:
function init() {
    scores = [0, 0]; // scores of both players to be 0
    activePlayer = 0; // activePlayer to be the left player
    roundScore = 0; // roundScore to be 0
    gamePlaying = true; // gamePlaying to be happening (we set this because at some point we also want gamePlaying to be false)
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    // document.querySelector('#score-0').textContent = '0'; //the alternative with querySelector
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


// 2. when we click button 'NEW GAME', we call the function "init"
document.querySelector('.btn-new').addEventListener('click', init); 
// $('.btn-new').addEventListener('click', init); //the jQuery way

// 3. when we click button 'ROLL DICE'
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // we make rounded random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1; //for dice

        // we display the dice + correct dice.png (****)
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; // the dice shows on the screen
        diceDOM.src = 'images/dice-' + dice + '.png'; /// we're gonna see the dice that presents a random number (defined in 3.1.)

        // we update the round score IF the rolled number was NOT a 1 (if it was, we switch players)
        if (dice !== 1) {
            roundScore = roundScore + dice; // add score (dice number) to roundScore
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // we select on which element we want to add score -- we set to '#current-'
        } else {
            nextPlayer(); // we define this function later
        }
    }    
});


// 4. when we click button 'HOLD'
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // we add current score to global score (**HARDER TO UNDERSTAND**)
        scores[activePlayer] += roundScore; // the alternative: scores[activePlayer] = scores[activePlayer] + roundScore;

        // we make updated score visible
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // we check if player won the game or not and do some things if he/she did (not)
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; // write "winner" to the player who won
            document.querySelector('.dice').style.display = 'none'; // hide dice
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // add 'winner' css style
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // remove red button that shows an active player
            gamePlaying = false; // game ends
            
        } else {
            nextPlayer();  // we define this function later
        }
    }
});


//5. when we switch players
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary operator (we could also use if-else statement) -- like this: if (activePlayer === 0) {activePlayer = 1} else {active player = 0 }
    roundScore = 0; //roundscore gets set to 0

    document.getElementById('current-0').textContent = '0'; //current score for player 1 gets set to 0
    document.getElementById('current-1').textContent = '0'; //the same applies for player 2

    document.querySelector('.player-0-panel').classList.toggle('active'); //we toggle player's panel as active
    document.querySelector('.player-1-panel').classList.toggle('active'); //the same applies for the other player

        // the alternative:
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none'; //we hide the dice
}


