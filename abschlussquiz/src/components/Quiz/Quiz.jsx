import { useState } from "react";
import { resultInitialState } from "../../constants";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";
import "./Quiz.scss";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://644982a3e7eb3378ca4ba471.mockapi.io/questions"
      );
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");

  // Initial check for questions
  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>; // or handle the loading state
  }

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  console.log(questions);

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setInputAnswer("");
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const handleInputChange = (event) => {
    setInputAnswer(event.target.value);
    if (event.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }
    return (
      <ul>
        {choices.map((choice, index) => (
          <li
            onClick={() => {
              onAnswerClick(choice, index);
            }}
            key={choice}
            className={answerIdx === index ? "selected-answer" : null}
          >
            {choice}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="quiz-wrapper">
      <div className="mayor-container">
        <img src="/images/mayor.png" alt="Mayor" />
      </div>
      <div className="quiz-container">
        {!showResult ? (
          <>
            {showAnswerTimer && (
              <AnswerTimer duration={30} onTimeUp={handleTimeUp} />
            )}
            <div>
              <span className="active-question-no">{currentQuestion + 1}</span>
              <span className="total-questions">/{questions.length}</span>
              <h2>{question}</h2>
              {getAnswerUI()}
              <div className="footer">
                <button
                  onClick={() => onClickNext(answer)}
                  disabled={!inputAnswer && answerIdx === null}
                >
                  {currentQuestion === questions.length - 1
                    ? "Beenden"
                    : "Weiter"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <Result
            result={result}
            onTryAgain={onTryAgain}
            totalQuestions={questions.length}
          ></Result>
        )}
      </div>
      <div className="damsoff-container">
        <img src="/images/damsoff.png" alt="Damsoff" />
      </div>
    </div>
  );
}

export default Quiz;

