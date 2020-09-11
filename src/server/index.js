const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => {
  // Handles any requests that don't match the ones above
  res.sendFile('index.html', { root: path.join(__dirname, '../../dist/') });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
