const express = require('express');
const router = express.Router();

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

module.exports = router;