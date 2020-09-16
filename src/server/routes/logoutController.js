module.exports = {
  post: (req, res) => {
    console.log('post /logout');
    req.logout();
    res.send({ login: false });
  },
};
