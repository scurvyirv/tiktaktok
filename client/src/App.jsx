import "./App.css";
import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const timerRef = useRef(null);

  // // start timer when a game is active
  // useEffect(() => {
  //   let timer;
  //   if (isGameActive) {
  //     timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
  //   } else {
  //     setTime(0); // reset time if the game is not active
  //   }
  //   return () => clearInterval(timer);
  // }, [isGameActive]);

  // timer logic
  // clear existing timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // start timer
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // stop timer first then reset timer
  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  // start game logic
  const startGame = () => {
    setIsGameActive(true);
    resetTimer();
    startTimer();
  };

  // end game logic
  const endGame = () => {
    // stops timer
    setIsGameActive(false);
    stopTimer();

    // save time to local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name: playerName, time });
    localStorage.setItem("highScores", JSON.stringify(highScores));
  };

  return (
    <div>
      <Header time={time} startGame={startGame} />
      <main>
        <Outlet context={{ startGame, endGame }} />{" "}
        {/* where game or high scores will render */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
