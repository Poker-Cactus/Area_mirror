const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Area Mirror Web Client</h1><a href="/client.apk">Download APK</a>');
});

app.get('/client.apk', (req, res) => {
  res.sendFile('/shared_data/client.apk');
});

app.listen(8081, () => {
  console.log('Web client running on port 8081');
});
