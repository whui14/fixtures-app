import React, { useEffect, useState } from 'react';
import './SearchInput.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fixtures-backend.onrender.com';

export default function SearchInput({ query, onQueryChange, onResultsChange, onSelectFixture, clearSelected }) {
  const [debounceTimer, setDebounceTimer] = useState(null);

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
      className="search-input"
    />
  );
}
