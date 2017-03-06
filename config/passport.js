const passport = require('passport');
const User = require('../models/user');
const config = require('../config/database');
// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

passport.serializeUser(function (user,done) {
    done(null,user.id);
});

passport.deserializeUser(function (id,done) {
    User.findById(id,function (err,user) {
        done(err,user);
    });
});


passport.use('local.signup',new LocalStrategy({
    firstName : 'firstName',
    lastName : 'lastName',
    email : 'email',
    password : 'password'
}, function (req,firstName,lastName,email,password,done) {
    User.findOne({'email' : email},function (err, user) {
        if(err)
        {
            return done(err);
        }
        if(user) {
            return done({message : 'Email Already Exists.'});
        }
        var newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        newUser.save(function (err,result) {
            if(err){
                return done(err);
            }
            return done(null,newUser);
        });
    });
}));















/* module.exports = function (passport) {
 var opts = {};
 opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
 opts.secretOrKey = config.secret;
 passport.use(new jwtStrategy(opts,function (jwt_payload,done) {
 console.log('heyy');
 console.log(jwt_payload);
 User.getUserById(jwt_payload._doc._id,function (err,user) {
 if(err) {
 return done(err,false);
 }
 if(user){
 return done(null,user);
 }
 else {
 return done(null,false);
 }
 });
 }));
 } */