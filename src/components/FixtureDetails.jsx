import React from 'react';
import './FixtureDetails.css'; // Import CSS styles

export default function FixtureDetails({ fixture, onClose }) {
  return (
    <div className="fixture-details">
      <h3>Fixture Details</h3>
      <p><strong>Date:</strong> {fixture.date}</p>
      <p><strong>Home Team:</strong> {fixture.homeTeam}</p>
      <p><strong>Away Team:</strong> {fixture.awayTeam}</p>
      <p><strong>Score:</strong> {fixture.score || 'N/A'}</p>
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
}
