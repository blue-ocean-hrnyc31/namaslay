module.exports = {
  post: (req, res) => {
    req.logout();
    res.send({ login: false });
  },
}
