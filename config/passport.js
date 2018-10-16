const passport      = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db            = require('../src/models/');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use('local-signup', new LocalStrategy(
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
      // If there's an existing user with the same email
      if (dbUser) {
        return done(null, false, {
          message: "Email is already taken.",
        });
      }

      // If there email is available, try to create a new user
      else {
        db.User.create({
          email: email,
          name: email,
          username: email,
          passwordHash: password,
        }).then(function(newUser) {
          // Successfully created a new user
          return done(null, newUser);
        }).catch(function(err) {
          // Failed to create a new user.
          return done(null, false, {
              message: "Error creating new account.",
            });
        });
      }
    });
  }
));

module.exports = passport;
