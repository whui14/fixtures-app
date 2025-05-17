import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function FileUpload() {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        setCsvData(results.data);
        await axios.post('/api/fixtures', results.data); // send to backend
      },
    });
  };

  return (
    <div>
      <h3>Upload data</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}

export default FileUpload;
