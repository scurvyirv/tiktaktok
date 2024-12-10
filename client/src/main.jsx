import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Outlet using react router
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
// import HighScores from './components/HighScores';

// render application with routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<GameBoard />} />
          {/* <Route path="highscores" element={<HighScores />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
