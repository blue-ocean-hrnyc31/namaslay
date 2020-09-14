const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session); // session store for PostgreSQL
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // used for hashing and comparing passwords
const flash = require('connect-flash');
const { User } = require('../db/Models');

const PORT = process.env.PORT || 3000;
const pool = require('../db');

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const saltRounds = 10;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findByUsername(username)
      .catch((err) => {
        console.log(err);
        return done(err); // unexpected error occured when trying to find user in db
      })
      .then((rows) => {
        if (rows.length === 0) {
          // no username found in db
          // console.log('no username found in db');
          return done(null, false, {
            message: 'no username exists in database',
          });
        } else {
          //username found in db
          let user = rows[0];
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              // username found and passwords match
              return done(null, user);
            } else {
              // username found and passwords don't match
              // console.log("username found and passwords don't match");
              return done(null, false, { message: 'incorrect password' });
            }
          });
        }
      });
  })
);

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

/**
 * The credentials used to authenticate a user will only be transmitted during the login request.
 * If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
 * In order to support login sessions, Passport will serialize and deserialize the user id to and from the session.
 * When subsequent requests are received, this id is used to find the user in the database, which will be restored to req.user.
 */

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .catch((err) => {
      done(err);
    })
    .then((rows) => {
      // console.log('deserialize:', rows[0]);
      done(null, rows[0]);
    });
});

app.get('*', (req, res) => {
  // Handles any requests that don't match the ones above
  res.sendFile('index.html', { root: path.join(__dirname, '../../dist/') });
});

app.post(
  '/login',
  (req, res, next) => {
    // console.log('req.body.username:', req.body.username);
    // console.log('req.body.password:', req.body.password);
    next();
  },
  passport.authenticate('local', {
    failureFlash: true,
  }),
  (req, res) => {
    // console.log('req.user:', req.user);
    // console.log('req.body:', req.body);
    res.sendStatus(200);
  }
);

app.post('/signup', (req, res) => {
  // console.log('post /signup req.body:', req.body);
  const { firstName, lastName, username, password, email } = req.body;
  User.findByUsername(username)
    .then((rows) => {
      if (rows.length > 0) {
        // if user already exists
        res.sendStatus(409);
      } else {
        //if user doesn't exist
        bcrypt
          .hash(password, saltRounds) // hash the user's plaintext password
          .then(function (passwordHash) {
            // store passwordHash in your password DB.
            User.create(firstName, lastName, username, passwordHash, email)
              .then(() => {
                // once passwordHash and other user info are stored
                res.sendStatus(201);
              })
              .catch((err) => {
                // if unexpected error occured while user info was being stored
                // console.log(err);
                res.sendStatus(500);
                throw err;
              });
          })
          .catch((err) => {
            // if unexpected error while the plaintext password was being hashed
            // console.log(err);
            res.sendStatus(500);
            throw err;
          });
      }
    })
    .catch((err) => {
      // if unexpected error occurred while trying to determine if the username already exists in the database
      //console.log(err);
      res.sendStatus(500);
      throw err;
    });
});

app.post('/logout', (req, res) => {
  req.logout();
  res.send({ login: false });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
