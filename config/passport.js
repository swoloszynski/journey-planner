const passport      = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db            = require('../src/models/');

passport.serializeUser(function(user, cb) {
  // Sets req.session.passport.user
  const sessionUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
  };
  cb(null, sessionUser);
});

passport.deserializeUser(function(sessionUser, cb) {
  // Gets sessionUser from req.session.passport.user
  cb(null, sessionUser);
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
          message: "User not found.",
        });
      }
      // If the given password doesn't match
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Email and password do not match.",
        });
      }
      // If user exists and password matches, return user
      return done(null, dbUser);
    });
  }
));


module.exports = passport;
