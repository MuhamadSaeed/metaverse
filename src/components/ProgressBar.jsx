const ProgressBar = ({ Progress }) => {
  return (
    <div className="ProgressBar">
      <div className="ProgressBar-fill" style={{ width: `${Progress}%` }}></div>
      <span className="ProgressBar-text">{Progress}% Complete</span>
    </div>
  );
}

export default ProgressBar;