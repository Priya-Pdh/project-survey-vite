const InputText = ({ error, value, handleChange }) => {
  return (
    <input
      type="text"
      value={value}
      className={error && "input-error"}
      onChange={handleChange}
    />
  );
  s;
};

export default InputText;
