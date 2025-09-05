// components/WelcomePage.js
import React, { useState } from 'react';
import './WelcomePage.css';

function WelcomePage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const setupSteps = [
    { id: 1, title: "Connect your accounts", completed: true },
    { id: 2, title: "Set up invoice insights", completed: true },
    { id: 3, title: "Enable wallet sync", completed: true }
  ];

  const handleContinue = () => {
    setShowSuccess(true);
    // Navigate to next step or dashboard
    setTimeout(() => {
      // window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Branding */}
        <div className="branding">
          <h1>Insight Hunter</h1>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome to Insight Hunter</h2>
          <p>Get started in a few simple steps</p>
        </div>

        {/* Setup Steps */}
        <div className="setup-steps">
          {setupSteps.map(step => (
            <StepItem key={step.id} step={step} />
          ))}
        </div>

        {/* Continue Button */}
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>

        {showSuccess && (
          <div className="success-message">
            Setup completed successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
