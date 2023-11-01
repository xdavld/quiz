import './Result.scss';
import { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import pdf from "../../assets/Zertifikat.pdf";

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
        setShowScores(false);
        setHighScores([]);
        onTryAgain();
    };

    const handleGeneratePDF = async () => {
      const url = pdf;
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      console.log(pdfDoc);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const nameText = `${name}`;
      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      const textSize = 20;
      const textWidth = font.widthOfTextAtSize(nameText, textSize);

      // Define the box range for the name
      const nameBox = {
        x: 365, // Starting position
        y: 285,
        width: 100, // Width of the box
        height: 40, // Height of the box
      };

      // Calculate the x-coordinate to center the text
      const x = nameBox.x + (nameBox.width - textWidth) / 2;
      const y = nameBox.y;

      // Draw the text
      firstPage.drawText(nameText, {
        x,
        y,
        size: textSize,
        color: rgb(0, 0, 0),
        font,
      });

      // Get the current date
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();

      firstPage.drawText(formattedDate, {
        x: 240,
        y: 108, // Adjust the position as needed
        size: 12,
        color: rgb(0, 0, 0),
        font: await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
      });

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();

      // You can now save or download the modified PDF
      // For example, you can create a Blob and generate a download link

      // Create a Blob from the modified PDF
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

      // Create a download link
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "Zertifikat.pdf";

      // Trigger a click event to initiate the download
      a.click();
    }

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
            <h3 id="safe-text">
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
                    <tr key={`${highScores.score}${highScores.name}${i}`}>
                        <td>{i + 1}</td>
                        <td>{highScores.name}</td>
                        <td>{highScores.score}</td>
                    </tr>
                    )
                })
                }
              </tbody>
            </table>
            <button onClick={handleGeneratePDF}>Zertifikat herunterladen</button>
          </>
        )}
      </div>
    );
};

export default Result;