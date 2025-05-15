const express        = require('express');
const authController = require("../controller/auth");

const router         = express.Router();

router.post('/login',()=>{

});

router.post('/signup',authController.signUp);

module.exports = router;