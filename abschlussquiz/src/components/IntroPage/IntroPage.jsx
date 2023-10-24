import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./IntroPage.scss";

const IntroPage = () => {
  const speechBubbles = [
    "Willkommen zum Abschlussquiz!",
    "Du hast 30 Sekunden Zeit, um jede Frage zu beantworten.",
    "Es gibt 10 Fragen insgesamt.",
    "Es gibt sowohl Multiple-Choice-Fragen als auch Fragen, bei denen du die Antwort selbst eingeben musst.",
    "Am Ende kannst du deinen Namen eingeben und deine Punktzahl zu speichern.",
    "Viel Glück und viel Spaß!",
  ];

  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentBubbleIndex < speechBubbles.length - 1) {
      setCurrentBubbleIndex(currentBubbleIndex + 1);
    } else {
      navigate("/quiz");
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="mayor-container">
        <img src="./src/assets/mayor.png" alt="Mayor" />
      </div>{" "}
      <div className="quiz-container">
        <div>
          <h2>{speechBubbles[currentBubbleIndex]}</h2>
        </div>
        <button onClick={handleNext}>
          {currentBubbleIndex < speechBubbles.length - 1
            ? "Weiter"
            : "Start Quiz"}
        </button>
      </div>
      <div className="damsoff-container">
        <img src="./src/assets/damsoff.png" alt="Damsoff" />
      </div>{" "}
    </div>
  );
};

export default IntroPage;
