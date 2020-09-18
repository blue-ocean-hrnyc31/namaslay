const { Router } = require('express');
const router = Router();
const passport = require('../../auth/passport.config.js');

/**************************************
 **********    SIGNUP   ***************
 ***************************************/

router.post('/signup', require('./signupController').post);

/**************************************
 **********    LOGIN   ***************
 ***************************************/

router.post(
  '/login',
  (req, res, next) => {
    console.log('post /login req.body:', req.body);
    console.log('attempting to authenticate user...');
    console.log("response.get('set-cookies'):", res.get('set-cookies'));
    next();
  },
  passport.authenticate('local'),
  require('./loginController').post
);

router.post('/logout', require('./logoutController.js').post);

module.exports = router;
