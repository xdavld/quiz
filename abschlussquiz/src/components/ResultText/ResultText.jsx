import React, { useState } from "react";
import Result from "../Result/Result"; // Import the Result component

import "./ResultText.scss";

const ResultText = ({ result, onTryAgain, totalQuestions }) => {
  const speechBubbles = [
    "Vielen Dank für Ihre unschätzbare Arbeit und Ihr Engagement!",
    "Ihre Forschung und Expertise sind von unschätzbarem Wert für unsere Inselgemeinschaft. ",
    "Sie haben uns mit wertvollen Erkenntnissen versorgt und einen klaren Weg aufgezeigt, wie wir uns effektiv gegen die Auswirkungen des Klimawandels wappnen können.",
    "Ich bin zuversichtlich, dass wir mit den Informationen, die Sie uns gegeben haben, den Klimawandel effektiv bewältigen und gleichzeitig die Lebensqualität unserer Bewohner verbessern können.",
    "Nochmals herzlichen Dank für Ihre unschätzbare Unterstützung und Ihr Engagement für die Zukunft unserer Insel.",
    "Nun kannst du dein Ergebnis und dein Zertifikat herunterladen.",
  ];

  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0);
  const [showResult, setShowResult] = useState(false); // State to control the visibility of the Result component

  const handleNext = () => {
    if (currentBubbleIndex < speechBubbles.length - 1) {
      setCurrentBubbleIndex(currentBubbleIndex + 1);
    } else {
      setShowResult(true); // Set showResult to true to display the Result component
    }
  };

  return !showResult ? (
    <div className="ResultText">
      <div>
        <h2>{speechBubbles[currentBubbleIndex]}</h2>
        <button onClick={handleNext}>
          {currentBubbleIndex < speechBubbles.length - 1
            ? "Weiter"
            : "Zum Ergebnis und Zertifikat"}
        </button>
      </div>
    </div>
  ) : (
    <Result
      result={result}
      onTryAgain={onTryAgain}
      totalQuestions={totalQuestions.length}
    ></Result>
  );
};

export default ResultText;
