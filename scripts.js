/*/(
  function () {
    const gameOptions = (function () {
/*/
//cacheDOM//
const modeSelect = document.getElementById('modeSelect');
const difficultySelect = document.getElementById('difficultySelect');
const playButton = document.getElementById('playButton');
const resetButton = document.getElementById('resetButton');
const boardSquares = document.getElementsByClassName('boardSquare');

//TURN FLAGS => MAYBE IT DOESN'T GO HERE//


//Event listeners//
playButton.addEventListener('click', runGame);
resetButton.addEventListener('click', resetGame);

//Functions//
function handleTurns(pOneTurn, pTwoTurn) {
  switch (pOneTurn) {
    case undefined:
      pOneTurn = true;
      pTwoTurn = false;
      return { pOneTurn, pTwoTurn, };

    case true:
      pOneTurn = false;
      pTwoTurn = true;
      return { pOneTurn, pTwoTurn, };

    case false:
      pOneTurn = true;
      pTwoTurn = false;
      return { pOneTurn, pTwoTurn, };

    default:
      alert('Something went wrong while handling turns');
      resetGame();
      break;
  }
}

function makeGridClickable(turns) {
  let boardSquaresArray = Array.from(boardSquares);
  boardSquaresArray.forEach((element) => {
    let boundedFunction = placeFigure.bind(this, element, turns);
    element.removeEventListener('click',boundedFunction);
    element.addEventListener('click', boundedFunction);
  })
}

function placeFigure(element, turns) {
  if (turns.pOneTurn === true) {
    element.textContent = 'X';
    turns = handleTurns(turns.pOneTurn, turns.pTwoTurn);
    makeGridClickable(turns)
  } else if (turns.pTwoTurn === true) {
    element.textContent = 'O'
    turns = handleTurns(turns.pOneTurn, turns.pTwoTurn);
    makeGridClickable(turns);
  }
}



function runGame() {
  let pOneTurn;
  let pTwoTurn;
  let turns = handleTurns(pOneTurn, pTwoTurn);
  makeGridClickable(turns);
}
function resetGame() { }







/*/
    }
    )()
  }
)()/*/