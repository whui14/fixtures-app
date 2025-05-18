import React from 'react';

export default function FixtureDetails({ fixture, onClose }) {
  return (
    <div style={{
      padding: 15,
      backgroundColor: '#e6f0ff',
      borderRadius: 4,
      marginTop: 20,
      border: '1px solid #0070f3',
    }}>
      <h3>Fixture Details</h3>
      <p><strong>Date:</strong> {fixture.date}</p>
      <p><strong>Home Team:</strong> {fixture.homeTeam}</p>
      <p><strong>Away Team:</strong> {fixture.awayTeam}</p>
      <p><strong>Score:</strong> {fixture.score || 'N/A'}</p>
      <button
        onClick={onClose}
        style={{
          marginTop: 10,
          padding: '6px 12px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  );
}
