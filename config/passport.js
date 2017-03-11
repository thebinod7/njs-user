const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
//var LocalStrategy    = require('passport-local').Strategy;


/* module.exports = function (passport) {
             var opts = {};
             opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
             opts.secretOrKey = config.secret;
             passport.use(new jwtStrategy(opts,function (jwt_payload,done) {
                 console.log('heeeee');
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

 module.exports = function (passport) {
     var opts = {}
     opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
     opts.secretOrKey = config.secret;
     passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
         console.log('Test case');
         User.getUserById({id: jwt_payload.sub}, function(err, user) {
             if (err) {
                 return done(err, false);
             }
             if (user) {
                 done(null, user);
             } else {
                 done(null, false);
                 // Could create a new account
             }
         });
     }));
 }