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
