require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Schema & Model
const fixtureSchema = new mongoose.Schema({
  fixture_mid: String,
  season: String,
  competition_name: String,
  fixture_datetime: String,
  fixture_round: String,
  home_team: String,
  away_team: String,
});
const Fixture = mongoose.model('Fixture', fixtureSchema);

// CSV upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const file = fs.createReadStream(req.file.path);

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      try {
        await Fixture.insertMany(results.data);
        fs.unlinkSync(req.file.path); // Delete temporary file
        res.json({ status: 'Upload complete!' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save data' });
      }
    },
    error: (err) => {
      console.error('CSV parse error:', err);
      res.status(400).json({ error: 'Invalid CSV file' });
    },
  });
});

// Search endpoint
app.get('/search', async (req, res) => {
  const q = req.query.q || '';
  try {
    const fixtures = await Fixture.find({
      $or: [
        { home_team: new RegExp(q, 'i') },
        { away_team: new RegExp(q, 'i') },
      ],
    });
    res.json(fixtures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Start server
const PORT = process.env.PORT;

if (!PORT) {
  console.error("PORT environment variable not set!");
  process.exit(1);
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));