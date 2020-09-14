const { User } = require('../../db/Models');

module.exports = {
  post: (req, res) => {
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
  }
}
