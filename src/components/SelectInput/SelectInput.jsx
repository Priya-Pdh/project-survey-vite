const SelectInput = ({ value, error, handleChange, options }) => {
  return (
    <select
      value={value}
      className={error && "input-error"}
      onChange={handleChange}
    >
      <option value="">Select</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
