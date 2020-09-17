module.exports = {
  post: (req, res) => {
    console.log('post /logout');
    console.log('logging out user...');
    req.logout();
    console.log('user is logged out. sending back {login:false}');
    res.send({ login: false });
  },
};
