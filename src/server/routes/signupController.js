const { User } = require('../../db/Models');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  post: (req, res) => {
    console.log('post /signup req.body:', req.body);
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      location,
      travels,
      certification,
    } = req.body;
    console.log('received username. finding username in db...');
    User.findByUsername(username)
      .then((rows) => {
        if (rows.length > 0) {
          // if user already exists
          console.log('username already exists. sending back 409...');
          res.status(409).send({
            error: 'username already exists',
          });
        } else {
          //if user doesn't exist
          console.log("username doesn't exist. hashing password...");
          bcrypt
            .hash(password, saltRounds) // hash the user's plaintext password
            .then(function (passwordHash) {
              // store passwordHash in your password DB.
              console.log('creating user in db...');
              User.create(
                firstName,
                lastName,
                username,
                passwordHash,
                email,
                location,
                travels,
                certification
              )
                .then(() => {
                  // once passwordHash and other user info are stored
                  console.log('user created. sending back 201...');
                  res.sendStatus(201);
                })
                .catch((err) => {
                  // if unexpected error occured while user info was being stored
                  // console.log(err);
                  console.log(
                    'unexpected error occured while user info was being stored:',
                    err
                  );
                  res.sendStatus(500);
                  throw err;
                });
            })
            .catch((err) => {
              // if unexpected error while the plaintext password was being hashed
              // console.log(err);
              console.log(
                'nexpected error while the plaintext password was being hashed:',
                err
              );
              res.sendStatus(500);
              throw err;
            });
        }
      })
      .catch((err) => {
        // if unexpected error occurred while trying to determine if the username already exists in the database
        console.log(
          'unexpected error occurred while trying to determine if the username already exists in the database:',
          err
        );
        res.sendStatus(500);
        throw err;
      });
  },
};
