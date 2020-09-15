module.exports = {
  post: (req, res) => {
      // console.log('req.user:', req.user);
      const {id, username, first_name, last_name, score, level} = req.user;
      // console.log('req.body:', req.body);
      res.status(200).send({id, username, first_name, last_name, score, level});
    }
}