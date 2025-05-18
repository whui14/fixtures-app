import React from 'react';
import './FixturesList.css'; // Import external stylesheet

export default function FixturesList({ fixtures, onSelect }) {
  return (
    <ul className="fixtures-list">
      {fixtures.length === 0 ? (
        <li className="no-results">No matches found</li>
      ) : (
        fixtures.map(fixture => (
          <li
            key={fixture._id}
            onClick={() => onSelect(fixture)}
            className="fixture-item"
          >
            {fixture.homeTeam} vs {fixture.awayTeam} ({fixture.date})
          </li>
        ))
      )}
    </ul>
  );
}
