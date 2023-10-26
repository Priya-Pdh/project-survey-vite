const RadioInput = ({ options, error, handleChange, name }) => {
  return (
    <div className="radio-input-container">
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            value={option}
            name={name}
            className={error && "input-error "}
            onChange={handleChange}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
