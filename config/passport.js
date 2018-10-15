
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var db          = require('../src/models/');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use('local-login', new LocalStrategy(
  {
    // Field names must match request body
    usernameField : 'email',
    passwordField : 'password',
  },
  function(email, password, done) {
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user found with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If the given password doesn't match
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If user exists and password matches, return user
      return done(null, dbUser);
    });
  }
));

// Exporting our configured passport
module.exports = passport;
