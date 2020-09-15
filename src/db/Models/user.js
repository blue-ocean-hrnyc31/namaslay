const pool = require('../index');

class User {
  static create(firstName, lastName, username, passwordHash, email, location, travels, certification) {
    return pool
      .connect()
      .then((client) => {
        return client
          .query(
            'INSERT INTO users (first_name, last_name, username, password, email, location, travel_history, certification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [firstName, lastName, username, passwordHash, email, location, travels, certification]
          )
          .then((res) => {
            client.release();
            // console.log('successfully inserted new user into db');
          })
          .catch((err) => {
            client.release();
            throw err;
          });
      })
      .catch((err) => {
        // console.log('error connecting pool to db');
        throw err;
      });
  }

  static findByUsername(username) {
    // console.log('username:', username);
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

  static findById(id) {
    return pool
      .connect()
      .then((client) => {
        return client
          .query('SELECT * FROM users WHERE user_id = $1', [id])
          .then(({ rows }) => {
            // console.log('rows:', rows);
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
