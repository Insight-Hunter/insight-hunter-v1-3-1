// components/StepItem.js
function StepItem({ step }) {
  return (
    <div className="step-item">
      <div className="checkmark">
        {step.completed && (
          <svg viewBox="0 0 24 24" className="check-icon">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        )}
      </div>
      <span className="step-title">{step.title}</span>
    </div>
  );
}
