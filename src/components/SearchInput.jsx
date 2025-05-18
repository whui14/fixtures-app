import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fixtures-backend.onrender.com';

export default function SearchInput({ query, onQueryChange, onResultsChange, onSelectFixture, clearSelected }) {
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Handle input change with debounce
  const handleChange = (e) => {
    const val = e.target.value;
    onQueryChange(val);
    onSelectFixture(null); // clear selected when searching

    if (debounceTimer) clearTimeout(debounceTimer);
    const timerId = setTimeout(() => {
      performSearch(val);
    }, 300);
    setDebounceTimer(timerId);
  };

  // Fetch search results from backend
  const performSearch = async (q) => {
    if (!q) {
      onResultsChange([]);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (res.ok) onResultsChange(data);
      else onResultsChange([]);
    } catch {
      onResultsChange([]);
    }
  };

  return (
    <input
      type="text"
      placeholder="Type team name to search..."
      value={query}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: 10,
        fontSize: 16,
        borderRadius: 4,
        border: '1px solid #ccc',
        marginBottom: 10,
      }}
    />
  );
}
