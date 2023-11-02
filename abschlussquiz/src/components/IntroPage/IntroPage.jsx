import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./IntroPage.scss";

const IntroPage = () => {
  const speechBubbles = [
    "Herzlich willkommen! Ich habe bereits gehört, dass Sie wichtige Informationen aus der Wissenschaft gesammelt haben.",
    "Das ist genau das, was wir jetzt brauchen, um unsere Insel vor den Auswirkungen des Klimawandels zu schützen.",
    "Die Unzufriedenheit der Bürger wächst, und es ist dringend notwendig, Maßnahmen zu ergreifen, um ihre Sorgen anzugehen..",
    "Bitte erzählen Sie mir, was Sie in Ihrer Forschung herausgefunden haben und welche Schritte wir unternehmen können, um unsere Gemeinschaft optimal auf die neuen Herausforderungen vorzubereiten.",
    "Gemeinsam können wir Lösungen finden, um unsere Insel widerstandsfähiger gegen den Klimawandel zu machen und die Lebensqualität unserer Bürger zu verbessern.",
    "Beginne nun mit dem Abschlussquiz!",
    "Anbei eine kurze Erklärung, wie das Quiz funktioniert:",
    "Du hast 30 Sekunden Zeit, um jede Frage zu beantworten.",
    "Es gibt 10 Fragen insgesamt.",
    "Es gibt sowohl Multiple-Choice-Fragen als auch Fragen, bei denen du die Antwort selbst eingeben musst.",
    "Am Ende kannst du deinen Namen eingeben, um deine Punktzahl zu speichern und dein Zertifikat herunterzuladen.",
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
        <img
          src='/images/mayor.png'
          alt="Mayor"
        />
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
        <img src="/images/damsoff.png" alt="Damsoff" />
      </div>{" "}
    </div>
  );
};

export default IntroPage;
