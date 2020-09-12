const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  // Handles any requests that don't match the ones above
  res.sendFile('index.html', { root: path.join(__dirname, '../../dist/') });
});

const { pool } = require('../auth/db_connection.js');

app.post('/signup', (req, res) => {
  const user = req.body.username;
  pool.query('SELECT username FROM users WHERE username = $1', [user])
    .then(({rows}) => {
      console.log(rows)
      if (rows[0].username === user) {
        res.send('success');
      } else {

      }
    })
    .then(() => res.send('success'))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/login', (req, res) => {
  const user = req.body.username;
  pool.query('SELECT username FROM users WHERE username = $1', [user])
    .then(({rows}) => {
      // console.log(rows);
      if (rows[0].username === user) {
        pool.query('SELECT password FROM users WHERE username = $1', [user])
        .then(result => {
          if (result.rows[0].password === req.body.password ) {
            res.send('success');
          } else {
            res.send('wrong password');
          }
        })

      } else {
        res.send('no user');
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
