const { User } = require('../../db/Models');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  post: (req, res) => {
    // console.log('post /signup req.body:', req.body);
    const { firstName, lastName, username, password, email } = req.body;
    User.findByUsername(username)
      .then((rows) => {
        if (rows.length > 0) {
          // if user already exists
          res.status(409).send({
            error: 'username already exists',
          });
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
  },
};
