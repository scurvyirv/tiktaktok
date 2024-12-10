import "./GameBoard.css";
import { useState, useEffect } from "react";

function GameBoard() {
  // define the state for the board and current player
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  // start timer at new game and reset
  useEffect(() => {
    let timer;
    if (isGameActive) {
      timer = setInterval(() => setTime((time) => time + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  // handle cell clicks
  const handleClick = (index) => {
    if (board[index]) return; // ignore clicks on filled squares

    // update the board after each click
    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard); // update state with new board
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // switches player to alternate turns
  };

  return (
    <div>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)} // attach click handler
          >
            {value /* display "X" or "O" */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
