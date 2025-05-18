import React from 'react';

export default function FixturesList({ fixtures, onSelect }) {
  return (
    <ul style={{
      listStyle: 'none',
      paddingLeft: 0,
      maxHeight: 200,
      overflowY: 'auto',
      border: '1px solid #ccc',
      borderRadius: 4,
      backgroundColor: '#fff',
    }}>
      {fixtures.length === 0 ? (
        <li style={{ color: '#888', fontStyle: 'italic', padding: 10 }}>No matches found</li>
      ) : (
        fixtures.map(fixture => (
          <li
            key={fixture._id}
            onClick={() => onSelect(fixture)}
            style={{
              padding: 10,
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {fixture.homeTeam} vs {fixture.awayTeam} ({fixture.date})
          </li>
        ))
      )}
    </ul>
  );
}
