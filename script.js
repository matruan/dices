'use strict';

var scores, roundScore, activePlayer, gamePlaying, sixCurse;

init();

function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    sixCurse = 0;
    roundScore = 0;
    document.getElementById('score--0').textContent = scores[0];
    document.getElementById('score--1').textContent = scores[1];
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    document.querySelector('.dice--0').style.display = 'none';
    document.querySelector('.dice--1').style.display = 'none';
}

document.querySelector('.btn--roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number 
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM0 = document.querySelector('.dice--0');
        diceDOM0.style.display = 'block';
        diceDOM0.src = 'dice-' + dice0 + '.png';

        var diceDOM1 = document.querySelector('.dice--1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice0 !== 1 && dice1 !== 1) {
            // Check how many times six was the number
            if (dice0 === 6 || dice1 ===6) {
              if (dice0 === 6) {
                sixCurse += 6; 
              }
              if (dice1 === 6) {
                sixCurse += 6;
              }
              if (sixCurse === 12) {
                  console.log('Han salido dos seis en el mismo turno, pierdes todos los puntos.');
                  scores[activePlayer] = 0;
                  switchPlayer();
              }
            }

            // Add score
            roundScore += dice0 + dice1;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            switchPlayer();
        }
    }
});


document.querySelector('.btn--hold').addEventListener('click', function () {
    scores[activePlayer] += roundScore;
    if (Number.isNaN(+document.querySelector('.final--score').value)){
        alert('El valor introducido no es válido');
        return;
    }
    if (scores[activePlayer] >= Number(document.querySelector('.final--score').value)) {
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice--0').style.display = 'none';
        document.querySelector('.dice--1').style.display = 'none';
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.querySelector('.player--' + activePlayer).classList.remove('active');
        gamePlaying = false;
    } else {
        switchPlayer();
    }
});

document.querySelector('.btn--new').addEventListener('click', init)

function init() {
    sixCurse = 0;
    gamePlaying = true;
    document.querySelector('.dice--0').style.display = 'none';
    document.querySelector('.dice--1').style.display = 'none';
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

}