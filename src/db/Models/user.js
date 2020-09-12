const pool = require('../index');

class User {
  static create(firstName, lastName, username, password, email) {
    return pool
      .connect()
      .then((client) => {
        return client
          .query(
            'INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)',
            [username, email, password, firstName, lastName]
          )
          .then((res) => {
            client.release();
            console.log('successfully inserted new user into db');
          })
          .catch((err) => {
            client.release();
            throw err;
          });
      })
      .catch((err) => {
        console.log('error connecting pool to db');
        throw err;
      });
  }

  static findByUsername(username) {
    return pool
      .connect()
      .then((client) => {
        return client
          .query('SELECT * FROM users WHERE username = $1', [username])
          .then(({ rows }) => {
            return rows;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = User;
