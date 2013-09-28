"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require("bcrypt"),
    SALT_WORK_FACTOR = 10;


var User = (function(){

  var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    first: String,
    last: String,
    authToken: String
  });


  UserSchema.pre( "save", function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if( !user.isModified( "password" ) ) {
      return next();
    }

    // generate a salt
    bcrypt.genSalt( SALT_WORK_FACTOR, function( err, salt ) {
      if( err ) {
        return next(err);
      }

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function( err, hash ) {
        if( err ) {
          return next(err);
        }

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

  UserSchema.methods.comparePassword = function( candidatePassword, cb ) {
    bcrypt.compare( candidatePassword, this.password, function( err, isMatch ) {
      if( err ) {
        return cb( err );
      }

      cb(null, isMatch);
    });
  };

  var UserModel = mongoose.model( "User", UserSchema );

  var _findByEmail = function(email, success, fail){
    UserModel.findOne({email:email}, function(e, doc){
      if(e){
        fail(e);
      }else{
        success(doc);
      }
    });
  };

  var _register = function( username, password, email,  success, fail ) {
    var newUser = new UserModel({
      username: username,
      password: password,
      email: email
    });

    newUser.save( function( err ) {
      if( err ) {
        throw err;
      } else {
        success( newUser );
      }
    });
  };

  return {
    schema      : UserSchema,
    model       : UserModel,
    register    : _register,
    findByEmail : _findByEmail
  };
}());

module.exports = User;

