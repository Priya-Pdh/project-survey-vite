import { useState } from "react";
import data from "../../data.json";
import "./InputComponent.css";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import InputText from "../InputText/InputText";
import SelectInput from "../SelectInput/SelectInput";
import RadioInput from "../RadioInput/RadioInput";
import RangeSlider from "../RangeSlider/RangeSlider";
import EmailInput from "../EmailInput/EmailInput";

const emailRegex = /^[a-z0-9_%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

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
  let userSubmitResult;

  // Create the user response object
  if (questions) {
    userSubmitResult = {
      sentence: questions.sentence,
      answer: answer,
      color: questions.color || "black",
      currency: questions.currency || "",
    };
  } else {
    console.log("An error occured");
  }

  const handleNextQuestion = () => {
    if (questions.type === "text" && answer.trim() === "") {
      setError("Please fill out the answer");
    } else if (questions.type === "email" && !emailRegex.test(answer)) {
      setError("Please enter a valid email address");
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

      setUserResponses([...userResponses, userSubmitResult]);
      setAnswer(""); // Clear the answer
      setError(""); // Clear the error message
      return true;
    }
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setAnswer(userInput);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuccess = handleNextQuestion();
    if (isSuccess) {
      setIsSubmitted(true);
      setUserResponses([...userResponses, userSubmitResult]);
    }
  };

  return (
    <div className="form-container">
      {!isSubmitted ? (
        <div key={questions.id} className="inner-form-wrapper">
          <h3>Welcome to RefreshmentZone 🍻</h3>
          <ProgressBar barState={progressBar} />
          <p className="questions">{questions.question}</p>

          {questions.type === "text" && (
            <div>
              <InputText error={error} handleChange={handleChange} />
            </div>
          )}

          {questions.type === "select" && (
            <SelectInput
              error={error}
              answer={answer}
              handleChange={handleChange}
              options={questions.options}
            />
          )}
          {questions.type === "radio" && (
            <RadioInput
              options={questions.options}
              error={error}
              handleChange={handleChange}
              name={`radioOption_${questions.id}`}
            />
          )}

          {questions.type === "range" && (
            <RangeSlider
              min={questions.min}
              max={questions.max}
              answer={answer}
              error={error}
              handleChange={handleChange}
            />
          )}

          {questions.type === "email" && (
            <EmailInput
              error={error}
              answer={answer}
              handleChange={handleChange}
            />
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
        <div className="result">
          {userResponses.map((response, index) => {
            return (
              <p key={index}>
                <span style={{ color: "black" }}>{response.sentence}</span>{" "}
                <span style={{ color: response.color }}>
                  {response.answer} {response.currency}.
                </span>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
