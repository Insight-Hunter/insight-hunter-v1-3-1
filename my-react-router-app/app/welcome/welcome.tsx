import React from 'react';

export default function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Insight Hunter</h1>
      <p>Get started in a few simple steps</p>

      <div className="welcome-icon" aria-hidden="true" />

      <ul className="welcome-steps">
        <li>✔ Connect your accounts</li>
        <li>✔ Set up invoice insights</li>
        <li>✔ Enable wallet sync</li>
      </ul>

      <button className="continue-button" type="button">
        Continue
      </button>
    </div>
  );
}
