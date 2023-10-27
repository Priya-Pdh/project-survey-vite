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
    console.log("An error occurred");
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
      // progress showing excluding the first two questions

      if (questions.id > 1) {
        setProgressBar(
          progressBar < 100
            ? progressBar + 100 / (data.length - 2)
            : progressBar
        );
      }

      setUserResponses([...userResponses, userSubmitResult]);
      setAnswer(""); // Clear the answer
      setError(""); // Clear the error message
      return true;
    }
  };

  const handlePreviousQuestion = () => {
    const updatedUserResponses = [...userResponses];
    const deletedResponses = updatedUserResponses.splice(-1, 1);

    // Previous values saved
    setUserResponses(updatedUserResponses);
    setQuestions(currentQuestion - 1);
    setAnswer(deletedResponses[0].answer);
    setError("");
    setIsSubmitted(false);

    //Previous state for progress bar
    if (questions.id > 1) {
      setProgressBar(
        progressBar > 0 ? progressBar - 100 / (data.length - 2) : progressBar
      );
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

  const handleReloadChange = () => {
    window.location.reload();
  };

  return (
    <div className="form-container">
      {!isSubmitted ? (
        <form key={questions.id} className="inner-form-wrapper">
          <h3>Sip & Share: Your Drink Preferences 🍻</h3>
          {questions.id > 1 ? <ProgressBar barState={progressBar} /> : null}
          <p className="questions">{questions.question}</p>

          {questions.type === "text" && (
            <section>
              <InputText
                error={error}
                value={answer}
                handleChange={handleChange}
              />
            </section>
          )}

          {questions.type === "select" && (
            <SelectInput
              value={answer}
              error={error}
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
              value={answer}
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

          <p className="error-message">{error}</p>

          <div>
            {currentQuestion > 0 && (
              <button className="previous btn" onClick={handlePreviousQuestion}>
                Previous
              </button>
            )}

            {currentQuestion < data.length - 1 ? (
              <button type="button" className="next btn" onClick={handleNextQuestion}>
                Next
              </button>
            ) : (
              <button className="submit btn" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </form>
      ) : (
        <section className="result">
          <h3>Response Summary</h3>
          <hr />
          {userResponses.map((response, index) => {
            return (
              <p key={index}>
                <span style={{ color: "black" }}>{response.sentence}</span>{" "}
                <span style={{ color: response.color }}>
                  {response.answer} {response.currency}
                </span>
              </p>
            );
          })}
          <span>Thanks for your input about drinks!</span>
          <div className="button-div">
            <button
              onClick={handleReloadChange}
              className="new-response-button btn"
            >
              Add New Response
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
