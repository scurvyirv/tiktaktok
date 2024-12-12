import { useState, useEffect } from "react";

const HighScores = ({ playerTime }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // load high scores from local storage (transition to backend API when backend is setup)
    const storedScores = JSON.parse(localStorage.getItem("highScores")) || [];
    setHighScores(storedScores);
  }, []);

  const saveScore = (time) => {
    const newScores = [...highScores, { time }];
    newScores.sort((a, b) => a.time - b.time); // sort scores
    setHighScores(newScores.slice(0, 10)); // keep top 10
    localStorage.setItem("highScores", JSON.stringify(newScores)); // save to localStorage
  };

  // call this function after the player wins
  useEffect(() => {
    if (playerTime) {
      saveScore(playerTime);
    }
  }, [playerTime]);

  return (
    <div>
      <h2>High Scores</h2>
      <ul>
        {highScores.map((score, index) => (
          <li key={index}>{score.time} seconds</li>
        ))}
      </ul>
    </div>
  );
};

export default HighScores;
