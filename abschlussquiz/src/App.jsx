import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"; 
import "./App.css";

import IntroPage from "./components/IntroPage/IntroPage";
import Quiz from "./components/Quiz/Quiz";
import { jsQuizz } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/quiz" element={<Quiz questions={questions} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
