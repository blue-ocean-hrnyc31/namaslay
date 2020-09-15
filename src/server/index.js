const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('../auth/passport.config.js');
const flash = require('connect-flash');

const PORT = process.env.PORT || 5000;
const pool = require('../db');

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(
  session({
    store: new pgSession({
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize()); // required to initialize Passport
app.use(passport.session()); // required to persist login sessions
app.use(flash());

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
