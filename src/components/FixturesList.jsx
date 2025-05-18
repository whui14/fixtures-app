import React from 'react';
import moment from 'moment';
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
            {fixture.home_team} vs {fixture.away_team} ({moment(fixture.fixture_datetime).format('YYYY-MM-DD HH:mm:ss')})
          </li>
        ))
      )}
    </ul>
  );
}
