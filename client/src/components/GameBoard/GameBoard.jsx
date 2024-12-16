import "./GameBoard.css";
import { useState, useRef } from "react";
import Header from "../Header/Header";
import { useOutletContext } from "react-router-dom";

function GameBoard() {
  // define states
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerName, setPlayerName] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isGameActive, setIsGameActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // access parent functions via outlet
  const { startGame, endGame } = useOutletContext();

  // check for winner
  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // main diagonal
      [2, 4, 6], // anti-diagonal
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // return "X" or "O"
      }
    }

    return board.every((cell) => cell) ? "Draw" : null; // check for a draw
  };

  // Restart game logic
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setTime(0);
    setIsGameActive(true);
    setShowModal(false);
  };

  // handle AI moves
  const makeAIMove = (updatedBoard) => {
    const availableCells = updatedBoard
      .map((value, index) => (value === null ? index : null))
      .filter((val) => val !== null);

    if (availableCells.length === 0) return;

    const randomMove =
      availableCells[Math.floor(Math.random() * availableCells.length)];

    if (randomMove !== undefined) {
      const newBoard = [...updatedBoard];
      newBoard[randomMove] = "O";
      setBoard(newBoard);

      const result = checkWinner(newBoard);
      if (result) {
        setIsGameActive(false);
        setModalMessage(result === "Draw" ? "It's a draw!" : `${result} wins!`);
        setShowModal(true);
        return;
      }

      setCurrentPlayer("X");
    }
  };

  // handle cell clicks
  const handleClick = (index) => {
    // ignore clicks if cell occupied OR game is over
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setIsGameActive(false);
      setModalMessage(result === "Draw" ? "It's a draw!" : `${result} wins!`);
      setShowModal(true);

      // call parent function to end game
      endGame();
      return;
    }

    // switch players and make AI move if "O"
    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(nextPlayer);

    if (nextPlayer === "O") {
      setTimeout(() => makeAIMove(newBoard), 500); // delays AI's move
    }
  };

  return (
    <div className="game-container">
      {/* bootstrap modal at start of game */}
      {!isGameActive && (
        <div className="start-game-modal">
          <h2>Welcome to Tik Tak Tok!</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            aria-label="Enter your name"
          />
          <button onClick={startGame}>Start Game</button>
        </div>
      )}

      {/* gameboard */}
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
            role="button"
            aria-label={`Cell ${index + 1}: ${value || "empty"}`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* bootstrap gameover modal */}
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          tabIndex="-1"
          style={{ display: showModal ? "block" : "none" }}
          role="dialog"
          aria-labelledby="gameOverModal"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="gameOverModal">
                  Game Over
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{modalMessage}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={restartGame}
                >
                  Restart Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
