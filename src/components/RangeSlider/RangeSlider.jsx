const RangeSlider = ({ min, max, answer, error, handleChange }) => {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={answer || 0}
        className={error && "input-error"}
        onChange={handleChange}
      />
      <label htmlFor="rangeInput" className="range-label">
        {answer || 0} SEK
      </label>
    </div>
  );
};

export default RangeSlider;
