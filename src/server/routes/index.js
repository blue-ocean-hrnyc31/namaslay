const { Router } = require('express');
const router = Router();
const passport = require('../../auth/passport.config.js');

/**************************************
 **********    SIGNUP   ***************
***************************************/

router.post( '/signup', require('./signupController').post );


/**************************************
 **********    LOGIN   ***************
***************************************/

router.post( '/login',
  passport.authenticate('local', { failureFlash: true,}),
  require('./loginController').post
);

router.post( '/logout', require('./logoutController.js').post );

module.exports = router;