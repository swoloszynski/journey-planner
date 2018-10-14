
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var db          = require('../src/models/');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-login', new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    // Must match request body
    usernameField : 'email',
    passwordField : 'password',
  },
  function(email, password, done) {
    console.log('about to get the user by email', email);
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      console.log('got a user');
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// Exporting our configured passport
module.exports = passport;
