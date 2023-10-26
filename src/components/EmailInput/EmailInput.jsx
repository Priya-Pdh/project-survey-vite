const EmailInput = ({ error, answer, handleChange }) => {
  return (
    <div>
      <input
        type="email"
        className={error && "input-error"}
        value={answer}
        onChange={handleChange}
      />
    </div>
  );
};

export default EmailInput;
