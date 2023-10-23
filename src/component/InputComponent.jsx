import { useState } from "react";
import data from "../data.json";
import "../styles/InputComponent.css";

export const InputComponent = () => {
  const [currentQuestion, setQuestions] = useState(0);

  const [answer, setAnswer] = useState("");
  const [rangeValue, setRangeValue] = useState(0);

  const [error, setError] = useState("");

  const questions = data[currentQuestion];

  const handleNextQuestion = () => {
    if (questions.type === "text" && answer.trim() === "") {
      setError("Please fill out the answer");
    } else if (questions.type === "range" && rangeValue === 0) {
      setError("Please select a value on the range slider");
    } else if (questions.type === "radio" && !answer) {
      setError("Please select an option");
    } else if (questions.type === "select" && answer === "") {
      setError("Please select an option"); 
    } else {
      setQuestions(currentQuestion + 1);
      setAnswer(""); // Clear the answer
      setRangeValue(0); // Clear the range value
      setError(""); // Clear the error message
    }
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setAnswer(userInput);
    setError("");
  };

  const handleRangeChange = (e) => {
    const selectedValue = e.target.value;
    setRangeValue(selectedValue);
    setError("");
  };
  return (
    <div className="form-container">
      <div key={questions.id}>
        <p>{questions.question}</p>
        <div className="error-message">{error}</div>
      </div>

      {questions.type === "text" && (
        <div>
          <input
            type="text"
            className={error && "input-error"}
            onChange={handleChange}
          />
        </div>
      )}

      {questions.type === "select" && (
        <select
          value={answer}
          className={error && "input-error"}
          onChange={handleChange}
        >
          {questions.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {questions.type === "radio" && (
        <div>
          {questions.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                value={option}
                name={`radioOption_${questions.id}`}
                className={error && "input-error"}
                onChange={handleChange}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}

      {questions.type === "range" && (
        <>
          <input
            type="range"
            min={questions.min}
            max={questions.max}
            step={questions.step}
            value={rangeValue}
            className={error && "input-error"}
            onChange={handleRangeChange}
          />
          <label htmlFor="rangeInput">{rangeValue}</label>
        </>
      )}
      <div>
        {currentQuestion < data.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button>Submit</button>
        )}
      </div>
    </div>
  );
};
