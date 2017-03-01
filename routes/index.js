const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',function (req,res) {
    data = {
        title: 'User Management System'
    },
    res.render('index',data);
});

router.get('/signup',function (req,res) {
    data = {
        title: 'User Management System'
    },
    res.render('/',data);
});

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

// route for showing the profile page
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;