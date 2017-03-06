const express = require('express');
const router = express.Router();
const passport = require('passport');
const csrf = require('csurf');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/',function (req,res) {
    res.render('index',{csrfToken:req.csrfToken()});
});

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

router.get('/forgot',function (req,res) {
    res.render('auth/forgot');
});

router.get('/reset_password',function (req,res) {
    res.render('auth/reset_password');
});

router.get('/logout',function (req,res) {
    res.render('logout');
});

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;