import { useState } from "react";
import data from "../data.json";
import "../styles/InputComponent.css";

export const InputComponent = () => {
  const [currentQuestion, setQuestions] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);

  const [answer, setAnswer] = useState("");
  const [isAnswerFilled, setIsAnswerFilled] = useState(false);

  const questions = data[currentQuestion];

  const handleNextQuestion = () => {
    if (isAnswerFilled) {
      if (currentQuestion < data.length - 1) {
        setQuestions(currentQuestion + 1);
        setIsAnswerFilled(false); // it resets the answer filled status
        setAnswer(""); // Clears the answer
      }
    } else {
      alert("Please fill out the answer");
    }
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setAnswer(userInput);
    setIsAnswerFilled(userInput.trim() !== "");
  };

  const handleRangeChange = (e) => {
    const selectedValue = e.target.value;
    setRangeValue(selectedValue);
    setIsAnswerFilled(selectedValue !== "0");
  };
  return (
    <div className="form-container">
      <div key={questions.id}>
        <p>{questions.question}</p>
      </div>
      {questions.type === "text" && (
        <input type="text" onChange={handleChange} />
      )}
      {questions.type === "select" && (
        <select value={answer} onChange={handleChange}>
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
