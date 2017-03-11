const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
var objectId = mongoose.Schema.ObjectId;
const UserSchema = mongoose.Schema({
    userId : objectId,
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type : String,
        require : true
    },
    phone : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profilePicUrl : {
        type : String
    },
    isActive : {
        type : Boolean,
        default : true
    },
    dateCreated : {
        type : Date,
        default : Date.now()
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id,callback);
}

module.exports.getUserByEmail = function (email, callback) {
    const query = {email : email}
    User.findOne(query,callback);
}

module.exports.addUser = function (newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword,hash,callback) {
    bcrypt.compare(candidatePassword,hash,function (err,isMatch) {
        if(err) throw err;
        callback(null,isMatch);
    });
}

module.exports.changePassword = function (existUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(existUser.newPassword, salt, function(err, hash) {
            if (err) throw err;
            existUser.newPassword = hash;
            console.log(existUser.newPassword);
            User.update(existUser.email, {$set: {password: existUser.newPassword}}, callback);
        });
    });
}
