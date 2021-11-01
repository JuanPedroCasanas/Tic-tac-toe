(
  function () {
    const gameOptions = (function () {

      //cacheDOM//
      const modeSelect = document.getElementById('modeSelect');
      const difficultySelect = document.getElementById('difficultySelect');
      const playButton = document.getElementById('playButton');
      const resetButton = document.getElementById('resetButton');
      const boardSquares = document.getElementsByClassName('boardSquare');

      //TURN FLAGS => MAYBE IT DOESN'T GO HERE//
      let pOneTurn;
      let pTwoTurn;

      //Event listeners//
      playButton.addEventListener('click', runGame);
      resetButton.addEventListener('click', resetGame);

      //Functions//
      function handleTurns() {
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
        boardSquaresArray.forEach((e) => {
          e.addEventListener('click', placeFigure.bind(this, e, turns));
        })
      }

      function placeFigure(e, turns) {
        if (turns.pOneTurn === true) {
          e.textContent = 'X'
          handleTurns();
        } else if (turns.pTwoTurn === true) {
          e.textContent = 'O'
          handlesTurns();
        }
      }



      function runGame() { }
      function resetGame() { }








    }
    )()
  }
)()