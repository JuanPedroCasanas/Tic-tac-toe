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
let players;
let gameStatus;

//Event listeners//
playButton.addEventListener('click', runGame);
resetButton.addEventListener('click', () => { resetGame(true) });
modeSelect.addEventListener('change', updateMode);

//Functions//
function playerFactory(avatar, isActive, type = 'player', strategy = 'max') {
  let newPlayerState = {
    avatar,
    isActive,
    type,
    strategy,
  };
  return {
    get avatar() { return newPlayerState.avatar },
    get isActive() { return newPlayerState.isActive },
    get type() { return newPlayerState.type },
    get strategy() { return newPlayerState.strategy },
    toggleActiveness: () => { newPlayerState.isActive = !newPlayerState.isActive; },
  };
}

function togglePlayBtn(state) {
  if (state) {
    playButton.removeEventListener('click', runGame);
  } else {
    playButton.addEventListener('click', runGame);
  }
}

function updateMode() {
  modeSelect.value = document.getElementById('modeSelect').value;
}

function makeGridClickable() {
  boardSquares.forEach((e) => {
    e.addEventListener('click', placeFigure);
  })
}

function checkEmptyCells() {
  let emptyCells = [];
  boardSquares.forEach((e) => { e.textContent === '' ? emptyCells.push(e) : () => { }; });
  return emptyCells;
}

//first checks if AI is playing, if it isn't checks if the clicked cell is empty and proceeds//
function placeFigure(event) {
  let activePlayer = (players[0].isActive === true) ? players[0] : players[1];
  if (activePlayer.type === 'computer') {
    decideAiPlacement();
    players.forEach((e) => { e.toggleActiveness() });

  } else if (event.target.textContent != '') {
  } else if (activePlayer.type === 'player') {
    event.target.textContent = activePlayer.avatar;
    players.forEach((e) => { e.toggleActiveness() });
    (players[1].type === 'computer') ? placeFigure() : () => { };
  }
  checkWinConditions(players[0]);
  checkWinConditions(players[1]);
}


function decideAiPlacement() {
  let emptyCells = checkEmptyCells();
  if (emptyCells.length != 0) {

    switch (difficultySelect.value) {
      case 'Easy':
        let randomCell = Math.floor((emptyCells.length) * Math.random());
        emptyCells[randomCell].textContent = 'O';
        break;

      case 'Medium':
        let goodMoveChance = Math.floor(11 * Math.random());
        if (goodMoveChance >= 5) {
          let bestCell = pickBestMove(true, 0, emptyCells);
          bestCell.textContent = 'O';
        } else if (goodMoveChance < 5) {
          let randomCell = Math.floor((emptyCells.length) * Math.random());
          emptyCells[randomCell].textContent = 'O';
        }
        goodMoveChance = Math.floor(11 * Math.random());
        break;

      case 'Hard':
        let bestCell = pickBestMove(true, 0, emptyCells);
        bestCell.textContent = 'O';
        break;
    }
  }
  checkWinConditions(players[0]);
  checkWinConditions(players[1]);
}

function pickBestMove(isMin, depth, emptyCells) {
  let bestScore = (isMin) ? Infinity : -Infinity;
  let bestMove;
  let currentPlayer = (isMin) ? players[1] : players[0];
  for (let i = 0; i != emptyCells.length; i++) {
    emptyCells[i].textContent = currentPlayer.avatar;
    let score = minimax(!isMin, depth);
    if (!isMin && score > bestScore) {
      bestScore = score;
      bestMove = emptyCells[i];
    } else if (isMin && score < bestScore) {
      bestScore = score;
      bestMove = emptyCells[i];
    }
    emptyCells[i].textContent = '';
  }
  return bestMove;
}

function minimax(isMin, depth) {
  let emptyCells = checkEmptyCells();
  let currentPlayer = (isMin) ? players[1] : players[0];
  let result = checkWinConditions(currentPlayer, true);
  let bestScore = (isMin) ? Infinity : -Infinity;
  if (result != null) {
    return result;
  } else if (result === null) {
    for (let i = 0; i != emptyCells.length; i++) {
      emptyCells[i].textContent = currentPlayer.avatar;
      let score = minimax(!isMin, depth + 1);
      if (!isMin && score > bestScore) {
        bestScore = score;
      } else if (isMin && score < bestScore) {
        bestScore = score;
      }
      emptyCells[i].textContent = '';
    }
  }
  return bestScore;
}

function checkWinConditions(player, isAiPrediction) {
  if (gameStatus != 'finished') {
    let emptyCells = checkEmptyCells();
    let x = [];
    boardSquares.forEach((e) => x.push(e.textContent));
    if (x[0] + x[1] + x[2] === player.avatar + player.avatar + player.avatar ||
      x[3] + x[4] + x[5] === player.avatar + player.avatar + player.avatar ||
      x[6] + x[7] + x[8] === player.avatar + player.avatar + player.avatar ||
      x[0] + x[3] + x[6] === player.avatar + player.avatar + player.avatar ||
      x[1] + x[4] + x[7] === player.avatar + player.avatar + player.avatar ||
      x[2] + x[5] + x[8] === player.avatar + player.avatar + player.avatar ||
      x[0] + x[4] + x[8] === player.avatar + player.avatar + player.avatar ||
      x[6] + x[4] + x[2] === player.avatar + player.avatar + player.avatar) {
      let resultForMinimax = (player.strategy === 'max') ? 1 : -1;
      if (!isAiPrediction) {
        gameStatus = 'finished';
        alert(`Player ${player.avatar} wins`);
        resetGame(false);
      }
      return resultForMinimax;
    } else if (emptyCells.length === 0) {
      if (!isAiPrediction) {
        gameStatus = 'finished';
        alert(`Draw`);
        resetGame(false);
      }
      return 0;
    } else {
      return null;
    }
  }
}

function runGame() {
  gameStatus = 'ongoing';
  switch (modeSelect.value) {
    case 'VS Player':
      togglePlayBtn(true);
      players = [playerFactory('X', true), playerFactory('O', false)];
      makeGridClickable();
      break;

    case 'VS AI':
      togglePlayBtn(true);
      players = [playerFactory('X', true),
      playerFactory('O', false, 'computer', 'mini')];
      makeGridClickable();
      break;
  }
}

function resetGame(type) {
  boardSquares.forEach((e) => {
    e.removeEventListener('click', placeFigure);
  })
  if (type === true) {
    boardSquares.forEach((e) => { e.textContent = '' })
    togglePlayBtn(false);
  } else {
  }
}


/*/
    }
    )()
  }
)()/*/



