const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { User } = require('../db/Models');
console.log('User:', User);
console.log('User.findByUsername:', User.findByUsername);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: 'allez_les_bleus'}));

// use router
const router = require('./routes/index.js')
app.use('/', router);

app.get('*', (req, res) => {
  // Handles any requests that don't match the ones above
  res.sendFile('index.html', { root: path.join(__dirname, '../../dist/') });
});


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
