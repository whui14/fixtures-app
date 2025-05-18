import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fixtures-backend.onrender.com';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file select
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  // Upload file to backend
  const onUpload = async () => {
    if (!file) {
      setMessage('Please select a CSV file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setMessage('Upload successful!');
        setFile(null);
      } else {
        setMessage('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      setMessage('Upload error: ' + error.message);
    }
  };

  return (
    <section>
      <h2>Upload Fixtures CSV</h2>
      <label htmlFor="file-upload" style={{ cursor: 'pointer', color: 'blue' }}>
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <button onClick={onUpload} style={{ marginLeft: 10, padding: '6px 12px' }}>Upload</button>
      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
    </section>
  );
}
