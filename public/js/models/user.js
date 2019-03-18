var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var bcrypt = require('bcrypt');

var newUser = mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    password: String
  }, { _id: false});
  
  newUser.plugin(AutoIncrement);
  
  newUser.pre('save', function(next) {
    var user = this;
    var SALT_WORK_FACTOR = 10;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
  
  });
  
  module.exports = mongoose.model('User', newUser);