import { useState } from "react";
import { Link } from "react-router-dom";

// name of game with nav bar alongside (needs clock that starts once new game initializes)
function Header({ time }) {
  return (
    <header>
      <h1>Tik Tak Tok</h1>
      <nav>
        <Link>New Game</Link>
        <Link>High Score</Link>
      </nav>
      <div className="timer">
        <div>Time: {time}s</div> {/* display the timer here */}
      </div>
    </header>
  );
}
export default Header;
