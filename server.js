const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the main HTML file with environment variable substitution
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'public', 'index.html');

  fs.readFile(htmlPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading HTML file:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Replace the placeholder with the actual API key from environment
    const apiKey = process.env.WEATHER_API_KEY || '';
    const modifiedHtml = data.replace(
      "WEATHER_API_KEY_PLACEHOLDER",
      apiKey
    );

    res.send(modifiedHtml);
  });
});

// Middleware to serve static files from public (including images and index.html)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🌤️  Weather Wrangler server running at http://localhost:${PORT}`);
  console.log(`📝 Make sure to add your WEATHER_API_KEY to the .env file`);
});
