
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var db          = require('../src/models/');

passport.use('test-strategy', new LocalStrategy(
  function(username, password, done) {
    console.log('HELLO I AM HERE AND RUNNING');
    return done(null, { hello: 'world' });
  }
));

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
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

//
// Exporting our configured passport
module.exports = passport;
