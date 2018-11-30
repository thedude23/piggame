var scores, roundScore, activePlayer, gamePlaying; //at the beginning we always write the variables needed for later; 
                                                   // we can define them later
var lastDice; //we also add this so we can check the last dices' numbers -- defined later (line 68)


init(); //0. we start the game (we could also name this function "startGame" or something)


//1. when game starts
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
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
    if(gamePlaying) {
        //1. we make 2 rounded random numbers between 1 and 6
        var dice1 = Math.floor(Math.random() * 6) + 1; //for first dice
        var dice2 = Math.floor(Math.random() * 6) + 1; //for second dice

        //2. we display the dices + correct dice.png's (****)
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';
            
        //3. we update the scores
        if (dice1 === 6 || dice2 === 6 && lastDice === 6) { //IF two 6's were thrown in a row, player loses all score
            //1. player looses his entire score
            scores[activePlayer] = 0; 
            document.querySelector('#score-' + activePlayer).textContent = '0'; //GLOBAL score goes back to 0
                
            //2. we switch players
            nextPlayer();
            
        } else if (dice1 !== 1 && dice2 !== 1) { //IF the rolled numbers were NOT 1, we add roundScore
            //1. we add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //1. we switch players
            nextPlayer();
        }

        lastDice = dice1 && dice2; //lastDice are, ofc, both dices -- dice1 and dice2
        
    }    
});


//4. when we click button 'HOLD'
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //1. we add current score to global score (****)
        scores[activePlayer] += roundScore; //the alternative: scores[activePlayer] = scores[activePlayer] + roundScore;

        //2. we make updated score visible
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //3. we make an option to change the winning score
        var input = document.querySelector('.final-score').value; //'.value' lets user to select value (****)
        var winningScore;   //we need this variable in order to select what the winningScore will be -- either (a) user's value or (b) pre-set 30
                                // Undefined, 0, null or "" are COERCED to false
                                // Anything else is COERCED to true
        
        if (input) { //if input is selected, then winningScore should be the one user selects it
            winningScore = input;

        } else { //else the winningScore should be set to 30
            winningScore = 30;
        }
        
        //4. we check if player won the game or not and do some things if he/she did (not)
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false; //game stops

        } else {
            nextPlayer();
        }
    }
});


//5. when we switch players
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //we switch players
    roundScore = 0; //roundscore gets set to 0

    document.getElementById('current-0').textContent = '0'; //current score for player 1 gets set to 0
    document.getElementById('current-1').textContent = '0'; //the same logic applies for player 2

    document.querySelector('.player-0-panel').classList.toggle('active'); //we toggle player's panel as active
    document.querySelector('.player-1-panel').classList.toggle('active'); //the same logic applies for the other player

    document.getElementById('dice-1').style.display = 'none'; //we hide dice 1
    document.getElementById('dice-2').style.display = 'none'; //we hide dice 2
}
