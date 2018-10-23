var scores, roundScore, activePlayer, gamePlaying; //at the beginning we always write which variables that will be needed


init(); //0. we start the game (we could also name this function "startGame" or something)


//1. when game starts
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
        //the alternative:
        // document.querySelector('#score-0').textContent = '0';
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


//2. when we click button 'NEW GAME', we call the function "init"
document.querySelector('.btn-new').addEventListener('click', init); 


//3. when we click button 'ROLL DICE'
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. we make rounded random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1; //for dice

        //2. we display the dice + correct dice.png (****)
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; //that way dice shows on the screen
        diceDOM.src = 'images/dice-' + dice + '.png'; ///we're gonna see the dice that presents a random number (defined in 3.1. (1.))

        //3. we update the round score IF the rolled number was NOT a 1 (if it was, we switch players)
        if (dice !== 1) {
            roundScore = roundScore + dice; //add score (dice number) to roundScore
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //we select on which element we want to add score -- we set to '#current-'
        } else {
            nextPlayer(); //we define this function later
        }
    }    
});


//4. when we click button 'HOLD'
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //1. we add current score to global score (****)
        scores[activePlayer] += roundScore;

        //2. we make updated score visible
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //3. we check if player won the game or not and do some things if he/she did (not)
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; //write "winner" to the player who won
            document.querySelector('.dice').style.display = 'none'; //hide dice
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); //add 'winner' css style
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); //remove red button that shows an active player
            gamePlaying = false; //game ends
            
        } else {
            nextPlayer();  //we define this function later
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


