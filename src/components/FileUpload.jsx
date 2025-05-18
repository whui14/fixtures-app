import React, { useState } from 'react';
import './FileUpload.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fixtures-backend.onrender.com';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

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
    <section className="upload-section">
      <h2>Upload Fixtures CSV</h2>

      <label htmlFor="file-upload" className="file-label">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        className="file-input"
        onChange={onFileChange}
      />

      {file && (
        <p className="file-selected">
          File selected: <strong>{file.name}</strong>. Click 'Upload' to continue.
        </p>
      )}

      <button onClick={onUpload} className="upload-button">Upload</button>

      {message && (
        <p className={message.includes('successful') ? 'message success' : 'message error'}>
          {message}
        </p>
      )}
    </section>
  );
}
