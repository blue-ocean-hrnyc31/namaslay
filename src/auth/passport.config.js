const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // used for hashing and comparing passwords
const flash = require('connect-flash');
const { User } = require('../db/Models');

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

/**
 * The credentials used to authenticate a user will only be transmitted during the login request.
 * If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
 * In order to support login sessions, Passport will serialize and deserialize the user id to and from the session.
 * When subsequent requests are received, this id is used to find the user in the database, which will be restored to req.user.
 */

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
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

module.exports = passport;
