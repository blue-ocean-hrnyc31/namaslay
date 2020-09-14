const { Router } = require('express');
const router = Router();

/**************************************
 **********    SIGNUP   ***************
***************************************/

router.post( '/signup', require('./signupController').post );


/**************************************
 **********    LOGIN   ***************
***************************************/

router.post( '/login', require('./loginController').post );

module.exports = router;