const express = require('express');
const app = express();
const path = require('path');

app.get('/about.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.json'));
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
