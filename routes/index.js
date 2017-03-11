const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/reqSignup', passport.authenticate('local.signup', {
    successRedirect : '/login',
    failureRedirect : '/',
    failureFlash : true
}));

router.get('/login',function (req,res) {
    data = {
        title: 'User Login'
    },
    res.render('login',data);
});

router.get('/dashboard',function (req,res) {
    data = {
        title: 'Dashboard'
    },
    res.render('secure/dashboard',data);
});

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;