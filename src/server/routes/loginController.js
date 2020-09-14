
module.exports = {
  post: (req, res) => {
    console.log('req.body:', req.body);
    res.sendStatus(200);
  }

}