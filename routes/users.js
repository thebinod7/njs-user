const express = require('express');
const  router = express.Router();

//Register
router.get('/register',function (req,res,next) {
   res.send('register');
});

//profile
router.get('/profile',function (req,res,next) {
    res.send('profile');
});

module.exports = router;