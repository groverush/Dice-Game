// variables for the game state


let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let previousVictories = [0, 0];

// variables to store references to the necessary DOM nodes

const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');
const player1Scoreboard = document.getElementById('player1Scoreboard');
const player2Scoreboard = document.getElementById('player2Scoreboard');
const message = document.getElementById('message');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');
const double = document.getElementById('double');
const victoryP1 = document.getElementById('victories-p1');
const victoryP2 = document.getElementById('victories-p2');
const resetVictories = document.getElementById('reset-victories');
// LOCAL STORAGE

const victoriesFromLocalStorage = JSON.parse(localStorage.getItem('previousVictories'));
if (victoriesFromLocalStorage) {
    console.log(victoriesFromLocalStorage);
    previousVictories = victoriesFromLocalStorage;
    victoryP1.textContent = previousVictories[0];
    victoryP2.textContent = previousVictories[1];
}

rollBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
resetVictories.addEventListener('click', function () {
    previousVictories = [0, 0];
    victoryP1.textContent = previousVictories[0];
    victoryP2.textContent = previousVictories[1];
    localStorage.setItem('previousVictories', JSON.stringify(previousVictories));
});


function startGame() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;



    if (player1Turn) {

        player1Score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randomNumber;
        player1Dice.classList.remove('active');
        player2Dice.classList.add('active');

        message.textContent = 'Player 2 Turn';

        player2Dice.textContent = "-";
    } else {


        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNumber;
        player2Dice.classList.remove('active');
        player1Dice.classList.add('active');

        message.textContent = 'Player 1 Turn';

        player1Dice.textContent = "-";
    }
    player1Turn = !player1Turn;
    flyingCow(randomNumber);
    if (double.checked) {
        doublePoints(randomNumber);
    }


    if (player1Score >= 20 || player2Score >= 20) {
        gameOver()
    }
    if (player1Score >= 20) {
        message.textContent = 'Player 1 has won! 🏆';
        player1Dice.classList.add('winner');
        player2Dice.classList.add('loser');
        previousVictories[0]++;
        victoryP1.textContent = previousVictories[0];
        localStorage.setItem('previousVictories', JSON.stringify(previousVictories));
    } else if (player2Score >= 20) {
        message.textContent = 'Player 2 has won! 🥇';
        player1Dice.classList.add('loser');
        player2Dice.classList.add('winner');
        previousVictories[1]++;
        victoryP2.textContent = previousVictories[1];
        localStorage.setItem('previousVictories', JSON.stringify(previousVictories));
    }



}

function doublePoints(randomNum) {
    if (!player1Turn) {
        player1Score += randomNum;
        player1Scoreboard.textContent = player1Score;


    } else if (player1Turn) {
        player2Score += randomNum;
        player2Scoreboard.textContent = player2Score;

    }
}

function gameOver() {
    rollBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    message.textContent = 'Player 1 Turn';
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Dice.textContent = '-';
    player2Dice.textContent = '-';
    rollBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';

    player1Dice.classList.remove('loser');
    player2Dice.classList.remove('loser');
    player1Dice.classList.remove('winner');
    player2Dice.classList.remove('winner');
    player2Dice.classList.remove('active');
    player1Dice.classList.add('active');
    double.checked = false;

}

function flyingCow(randomNum) {
    const newRandom = Math.floor(Math.random() * 6) + 1;
    if (randomNum === newRandom) {
        message.textContent = `Hey! Look, it's a fliyng cow! 🐄`
    }
}