import './Result.scss';
import { useState, useEffect } from 'react';

const Result = ({totalQuestions, result, onTryAgain}) => {

    const [name, setName] = useState("");
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);
    }, []);

    const handleSave = () => {
        const score ={
            name,
            score: result.score,
        };
        
        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true); 

        localStorage.setItem("highScores", JSON.stringify(newHighScores));
    };

    const handleTryAgain = () => { 
        onTryAgain();
        setShowScores(false);
        setHighScores([]);
    };

    return (
      <div className="result">
        <h3>Result</h3>
        <p>
          Total Questions: <span>{totalQuestions}</span>
        </p>
        <p>
          Total Score: <span>{result.score}</span>
        </p>
        <p>
          Correct Answers: <span>{result.correctAnswers}</span>
        </p>
        <p>
          Wrong Answers: <span>{result.wrongAnswers}</span>
        </p>
        <button onClick={handleTryAgain}>Nochmal</button>
        {!showScores ? (
          <>
            <h3>
              Gib deinen Namen ein <br /> um dein Ergebnis zu speichern!
            </h3>
            <input
              placeholder="Dein Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
            <button onClick={handleSave}>Speichern</button>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Ranking</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map((highScores, i) => {
                return (
                    <tr>
                    <td>{i + 1}</td>
                    <td>{highScores.name}</td>
                    <td>{highScores.score}</td>
                    </tr>
                    )
                })
                }
              </tbody>
            </table>
          </>
        )}
      </div>
    );
};

export default Result;