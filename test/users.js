/* global describe, it, beforeEach, afterEach */
"use strict";

var mongoose = require("mongoose");
var user = require("../lib/users");

mongoose.connect( "mongodb://localhost/tdd-test" );

describe( "User", function() {
  var currentUser = null;

  beforeEach( function( done ) {
    // Add some test data    
    user.register( "test", "password", "test@test.com",  function( user ){
      currentUser = user;
      done();
    });
  });

  afterEach( function( done ){
    // Nuke the test DB
    user.model.remove({}, function() {
      done();
    });
  });

  it( "registers a new user", function( done ){
    user.register( "test2", "password2", "test2@test.com", function( user ){
      user.username.should.equal( "test2" );
      user.password.should.not.equal( "password2" );
      user.email.should.equal( "test2@test.com" );
      done();
    }, function( message ){
      message.should.equal( null );
      done();
    });
  });

  it( "retrieves by email", function( done ){
    user.findByEmail( currentUser.email, function( user ){
      user.email.should.equal( "test@test.com" );
      done();
    });
  });

  it( "authenticates and returns user with valid login", function( done ){
    user.authenticate( currentUser.username, "password", function( user ){
      user.email.should.equal( "test@test.com" );
      done();
    }, function(){
      throw("oops");
      done();
    });
  });

  it( "authenticates and returns fail with invalid login", function( done ){
    user.authenticate( currentUser.username, "liar", function( user ){
      throw( "This shouldn't happen" );
    }, function(){
      done();
    });
  });
});

