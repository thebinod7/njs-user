const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

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

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        User.findOne({id: jwt_payload._doc.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
                // or you could create a new account
            }
        });
    }));
}