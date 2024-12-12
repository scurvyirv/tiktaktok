import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  // start timer when a game is active
  useEffect(() => {
    let timer;
    if (isGameActive) {
      timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    } else {
      setTime(0); // reset time if the game is not active
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  // start game logic
  const startGame = () => {
    setIsGameActive(true);
    setTime(0); // Reset the timer
  };
  return (
    <div>
      <Header time={time} startGame={startGame} />
      <main>
        <Outlet context={{ startGame }} />{" "}
        {/* where game or high scores will render */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
