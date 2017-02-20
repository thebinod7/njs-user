const express = require('express');
const  router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register',function (req,res) {
    console.log(req.body);
   const newUser = new User({
       firstName : req.body.firstName,
       lastName : req.body.lastName,
       phone : req.body.phone,
       email : req.body.email,
       password : req.body.password
   });
   console.log('Route:'+newUser);
   User.getUserByEmail(newUser.email,function (err,userEmail) {
       if(err) throw err;
       if(userEmail){
           res.json({msg:"Email already exists"})
       }
       else {
          /* newUser.save(function (err,doc) {
               console.log(err);
               if(err){
                   res.json({success : false, msg : 'Failed to register!'});
               } else {
                   res.json({success:true,msg:'Success',result:doc})
               }
           }); */
           User.addUser(newUser,function (err,doc) {
               if(err){
                   res.json({success : false, msg : 'Failed to register!'});
               } else {
                   res.json({success:true,msg:'Success',result:doc})
               }
           })
       }
   });
});

router.post('/changePassword',function (req,res) {
    const email = req.body.email;
    const existUser = {
         password : req.body.password,
         newPassword : req.body.newPassword
    }
    User.getUserByEmail(email,function (err,isUser) {
        if(err) throw err;
        if(isUser){
            User.comparePassword(existUser.password,isUser.password,function (err,isMatch) {
                console.log(isMatch);
                if(err) throw err;
                if(isMatch){
                    User.changePassword(req.body.newPassword,function (err,doc) {
                        if(err){
                            res.json({success : false, msg : 'Error occured,try again!'});
                        } else {
                            res.json({success:true,msg:'Success',result:doc})
                        }
                    })
                }
                else {
                    return res.json({msg:'Wrong password!'});
                }
            });
        } else {
            res.json({success : false, msg : 'Email not found'});
        }
    })
});

//Authenticate
router.post('/auth',function (req,res) {
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

router.get('/:id',function (req,res,next) {
    console.log(req.params.id);
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err)
        }
        if (user) {
            res.json({success:true,result:user});
        } else {
            res.send("No user found with that ID")
        }
    });
});

router.post('/:id',function (req,res,next) {
    User.findById(req.params.id, function (err, user) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.phone = req.body.phone || user.phone;

            // Save the updated document back to the database
            user.save(function (err, doc) {
                if (err) {
                    res.status(500).send(err)
                }
                res.json({success:true,result:doc});
            })
        }
    });
});

//profile
router.get('/profile', passport.authenticate('jwt',{session:false}), function (req,res,next) {
   res.json({user : req.user});
});

/* router.get('/profile',function (req,res,next) {
    passport.authenticate('jwt',{session:false}),function (err,user) {
        console.log(err);
     if(err) throw err;
     if(!user) {
         res.json({msg:'Authentication failed'});
     }
        res.json({user : req.user});
    }
}); */

module.exports = router;