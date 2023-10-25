const InputText = ({ error, handleChange }) => {
  return (
    <input
      type="text"
      className={error && "input-error"}
      onChange={handleChange}
    />
  );
  s;
};

export default InputText;
