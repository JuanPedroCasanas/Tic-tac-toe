/*/(
  function () {
    const gameOptions = (function () {
/*/
//cacheDOM//
const modeSelect = document.getElementById('modeSelect');
const difficultySelect = document.getElementById('difficultySelect');
const playButton = document.getElementById('playButton');
const resetButton = document.getElementById('resetButton');
const boardSquares = Array.from(document.getElementsByClassName('boardSquare'));

//TURN FLAGS => MAYBE IT DOESN'T GO HERE//
let turn = 0;


//Event listeners//
playButton.addEventListener('click', runGame);
resetButton.addEventListener('click', resetGame);

//Functions//
function playerFactory(avatar, isActive) {
  let newPlayerState = {
    avatar,
    isActive,
  }
  return {
    get avatar() { return newPlayerState.avatar },
    get isActive() { return newPlayerState.isActive },
    toggleActiveness: () => { newPlayerState.isActive = !newPlayerState.isActive; },
  };
}

function makeGridClickable(players) {
  boardSquares.forEach((e) => {
    e.addEventListener('click', () => { placeFigure(players, e) });
  })
}

function placeFigure(players, e) {
  if (e.textContent != '') {
  } else if (players[0].isActive) {
    e.textContent = 'X';
    turn++
    checkWinConditions(players[0]);
    checkWinConditions(players[1]);
    players.forEach((e) => { e.toggleActiveness() });

  } else if (players[1].isActive) {
    e.textContent = 'O'
    turn++
    checkWinConditions(players[0]);
    checkWinConditions(players[1]);
    players.forEach((e) => { e.toggleActiveness() });
  }
}

function checkWinConditions(player) {
  let x = []
  boardSquares.forEach((e) => x.push(e.textContent));
  if (x[0] + x[1] + x[2] === player.avatar + player.avatar + player.avatar ||
    x[3] + x[4] + x[5] === player.avatar + player.avatar + player.avatar ||
    x[6] + x[7] + x[8] === player.avatar + player.avatar + player.avatar ||
    x[0] + x[3] + x[6] === player.avatar + player.avatar + player.avatar ||
    x[1] + x[4] + x[7] === player.avatar + player.avatar + player.avatar ||
    x[2] + x[5] + x[8] === player.avatar + player.avatar + player.avatar ||
    x[0] + x[4] + x[8] === player.avatar + player.avatar + player.avatar ||
    x[6] + x[4] + x[2] === player.avatar + player.avatar + player.avatar) {
    alert(`Player ${player.avatar} wins`);
    resetGame()
  } else if (turn === 9) {
    console.log('draw');
    resetGame()
  } else {
  }
}

function runGame() {
  let players = [playerFactory('X', true), playerFactory('O', false)]
  makeGridClickable(players);
}

function resetGame() {
  turn = 0;
  boardSquares.forEach((e)=>e.textContent = '');
 }



/*/
    }
    )()
  }
)()/*/



