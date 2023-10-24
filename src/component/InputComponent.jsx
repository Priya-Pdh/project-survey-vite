import { useState } from "react";
import data from "../data.json";
import "../styles/InputComponent.css";
import { ProgressBar } from "./ProgressBar";

export const InputComponent = () => {
  const [currentQuestion, setQuestions] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  //Progress Bar
  const [progressBar, setProgressBar] = useState(0);

  // User responses
  const [userResponses, setUserResponses] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = data[currentQuestion];

  // Create the user response object
  const userSubmitReslut = {
    sentence: questions.sentence,
    answer: answer,
    color: questions.color || "black",
    unit: questions.unit || "",
  };

  const handleNextQuestion = () => {
    if (questions.type === "text" && answer.trim() === "") {
      setError("Please fill out the answer");
    } else if (questions.type === "range" && answer === "") {
      setError("Please select a value on the range slider");
    } else if (questions.type === "radio" && !answer) {
      setError("Please select an option");
    } else if (questions.type === "select" && answer === "") {
      setError("Please select an option");
    } else {
      setQuestions(currentQuestion + 1);
      setProgressBar(
        progressBar < 100 ? progressBar + 100 / data.length : progressBar
      );

      setUserResponses([...userResponses, userSubmitReslut]);
      setAnswer(""); // Clear the answer
      setError(""); // Clear the error message
    }
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setAnswer(userInput);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setUserResponses([...userResponses, userSubmitReslut]);
  };

  return (
    <div className="form-container">
      {!isSubmitted ? (
        <div key={questions.id} className="inner-form-wrapper">
          <ProgressBar barState={progressBar} />
          <p>{questions.question}</p>

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
                <div key={index} className="radio-input">
                  <input
                    type="radio"
                    value={option}
                    name={`radioOption_${questions.id}`}
                    className={error && "input-error "}
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
                value={answer || 0}
                className={error && "input-error"}
                onChange={handleChange}
              />
              <label htmlFor="rangeInput">{answer}</label>
            </>
          )}
          <div className="error-message">{error}</div>
          <div>
            {currentQuestion < data.length - 1 ? (
              <button className="next btn" onClick={handleNextQuestion}>
                Next
              </button>
            ) : (
              <button className="submit btn" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          {userResponses.map((response, index) => {
            return (
              <p key={index}>
                <span style={{ color: "black" }}>{response.sentence}</span>{" "}
                <span style={{ color: response.color }}>
                  {response.answer}
                  {response.unit}
                </span>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
