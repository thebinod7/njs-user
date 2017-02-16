const express = require('express');
const  router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register',function (req,res,next) {
   var newUser = new User({
       firstName : req.body.firstName,
       lastName : req.body.lastName,
       phone : req.body.phone,
       email : req.body.email,
       password : req.body.password
   });
   User.addUser(newUser,function (err,doc) {
       if(err){
           res.json({success : false, msg : 'Failed to register!'});
       } else {
           res.json({success:true,msg:'Success',result:doc})
       }
   })
});

//Authenticate
router.post('/auth',function (req,res,next) {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, function (err, user) {
       if(err) throw err;
        if(!user){
            return res.json({msg:'User does not exists.'});
        }
        User.comparePassword(password,user.password,function (err,isMatch) {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user,config.secret,{
                    expiresIn : 604800 //1 week
                });
                res.json({success:true,token:'JWT'+token,user:{
                    id: user._id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    phone : user.phone,
                    email : user.email
                }});
            }
            else {
                return res.json({msg:'Wrong password!'});
            }
        });
    });
});

//profile
router.get('/profile', passport.authenticate('jwt',{session:false}), function (req,res,next) {
   res.json({user : req.user});
});

module.exports = router;