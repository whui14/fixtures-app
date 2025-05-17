import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('http://localhost:5000/upload', formData);
    alert('File uploaded!');
  };

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val) {
      const res = await axios.get(`http://localhost:5000/search?q=${val}`);
      setResults(res.data);
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Fixture Uploader & Search</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload CSV</button>

      <hr />

      <input
        type="text"
        placeholder="Search team name..."
        value={search}
        onChange={handleSearch}
      />

      <ul>
        {results.map((item, idx) => (
          <li key={idx} onClick={() => setSelected(item)}>
            {item.date} - {item.homeTeam} vs {item.awayTeam}
          </li>
        ))}
      </ul>

      {selected && (
        <div style={{ marginTop: '20px' }}>
          <h3>Fixture Details</h3>
          <p><strong>Date:</strong> {selected.date}</p>
          <p><strong>Home:</strong> {selected.homeTeam}</p>
          <p><strong>Away:</strong> {selected.awayTeam}</p>
          <p><strong>Score:</strong> {selected.score}</p>
        </div>
      )}
    </div>
  );
}

export default App;