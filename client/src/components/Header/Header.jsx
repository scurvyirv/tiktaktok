import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// name of game with nav bar alongside (needs clock that starts once new game initializes)
function Header({ startGame, time }) {
  const navigate = useNavigate();

  const handleNewGame = () => {
    startGame();
    navigate("/");
  };

  return (
    <header>
      <h1>Tik Tak Tok</h1>
      <nav>
        {/* Button for New Game */}
        <button onClick={handleNewGame} className="nav-button">
          New Game
        </button>

        {/* Link for High Scores */}
        <Link to="/highscores" className="nav-link">
          High Score
        </Link>
      </nav>
      <div className="timer">
        {/* display the timer here */}
        <div>Time: {time}s</div>
      </div>
    </header>
  );
}
export default Header;
