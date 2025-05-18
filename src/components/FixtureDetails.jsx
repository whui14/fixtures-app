import React from 'react';
import moment from 'moment';
import './FixtureDetails.css';

export default function FixtureDetails({ fixture, onClose }) {
  // Format datetime with moment, removing milliseconds
  const formattedDate = moment(fixture.fixture_datetime).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div className="fixture-details">
      <h3>Fixture Details</h3>
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Season:</strong> {fixture.season}</p>
      <p><strong>Competition Name:</strong> {fixture.competition_name}</p>
      <p><strong>Fixture Round:</strong> {fixture.fixture_round}</p>
      <p><strong>Home Team:</strong> {fixture.home_team}</p>
      <p><strong>Away Team:</strong> {fixture.away_team}</p>
      {/* If you have score, add here */}
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
}
