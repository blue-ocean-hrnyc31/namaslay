const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('../db/Models');
console.log('User:', User);
console.log('User.findByUsername:', User.findByUsername);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  // Handles any requests that don't match the ones above
  res.sendFile('index.html', { root: path.join(__dirname, '../../dist/') });
});

app.post('/login', (req, res) => {
  console.log('req.body:', req.body);
  res.sendStatus(200);
});

app.post('/signup', (req, res) => {
  console.log('req.body:', req.body);
  const { firstName, lastName, username, password, email } = req.body;
  User.findByUsername(username).then((rows) => {
    if (rows.length > 0) {
      res.send({ error: 'user already exists' });
    } else {
      User.create(firstName, lastName, username, password, email)
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
