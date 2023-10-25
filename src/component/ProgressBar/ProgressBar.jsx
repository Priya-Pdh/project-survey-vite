import "./ProgressBar.css";
export const ProgressBar = ({ barState}) => {
  return (
    <>
    <div className="progress-bar-container">
      <div style={{ width: `${barState}%` }} className="progress-bar" ></div>
    </div>
     
     </>
  );
};
