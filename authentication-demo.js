const express = require('express');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session); // session store for PostgreSQL
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // used for hashing and comparing passwords
const bodyParser = require('body-parser');

const pool = require('../db/index');
const saltRounds = 10; // hash cost factor (higher is more secure but slower)

// middleware to check if a user is logged in
function loggedIn(req, res, next) {
  console.log('checking user logged in status');
  console.log('req.originalUrl:', req.originalUrl);
  console.log('req.user:', req.user);
  console.log('req.session:', req.session);
  if (req.user && req.params.username === req.user.username) {
    next();
  } else {
    res.redirect('/login');
  }
}

const app = express();
app.use(
  session({
    store: new pgSession({
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize()); // required to initialize Passport
app.use(passport.session()); // required to persist login sessions

passport.use(
  new LocalStrategy((username, password, done) => {
    pool.connect().then((client) => {
      return client
        .query(
          'SELECT id, username, password_hash from users where username = $1',
          [username]
        )
        .then(({ rows }) => {
          //if user exists
          client.release();
          if (rows.length === 0) {
            done(null, false, { message: 'no user exists in database' });
          } else {
            let user = rows[0];
            bcrypt.compare(password, user.password_hash, (err, result) => {
              if (err) {
                console.log(
                  'unexpected error comparing password hash to plaintext password'
                );
                done(err);
              } else if (result) {
                done(null, user); //req.user
              } else {
                done(null, false, { message: 'incorrect password' });
              }
            });
          }
        })
        .catch((err) => {
          client.release();
          console.log('unexpected error querying database for user:', err);
          done(err, {});
        });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  pool.connect().then((client) => {
    return client
      .query(
        'SELECT id, username, password_hash from users where username = $1',
        [username]
      )
      .then(({ rows }) => {
        client.release();
        done(null, rows[0]);
      })
      .catch((err) => {
        client.release();
        console.log('unexpected error deserializing user');
        done(err);
      });
  });
});

app.get(
  '/login',
  (req, res, next) => {
    if (req.user) {
      res.redirect(`/user/${req.user.username}`);
    } else {
      next();
    }
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
  }
);

app.get(
  '/signup',
  (req, res, next) => {
    if (req.user) {
      res.redirect(`/user/${req.user.username}`);
    } else {
      next();
    }
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/signup.html'));
  }
);

app.post('/signup', (req, res) => {
  console.log('req.body.username:', req.body.username);
  console.log('req.body.password:', req.body.password);
  bcrypt.hash(req.body.password, saltRounds).then(function (passwordHash) {
    // Store hash in your password DB.
    pool.connect().then((client) => {
      client.release();
      client.query(
        'INSERT INTO users (username, password_hash) values ($1, $2)',
        [req.body.username, passwordHash]
      );
      res.redirect('/login');
    });
  });
});

app.post(
  '/login',
  (req, res, next) => {
    console.log('req.body.username:', req.body.username);
    console.log('req.body.password:', req.body.password);
    next();
  },
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`/user/${req.body.username}`);
  }
);

app.get(
  '/user/:username',
  (req, res, next) => {
    if (req.user && req.params.username === req.user.username) {
      next();
    } else if (req.user) {
      res.send('<h1>Access Denied</h1>');
    } else {
      res.redirect('/login');
    }
  },
  (req, res) => {
    res.send(
      '<h1>Successfully logged in</h1><form action="/logout" method="post"><button type="submit"/>Logout</button></form>'
    );
  }
);

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
