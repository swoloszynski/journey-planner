var User          = require('../src/models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'hashedPassword',
            // allows it to pass back the entire request to the callback
            passReqToCallback : true,
        },
        function(email, password, done) {
          User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if(!user) {
              // Create a new user
              User.create({
                email: email,
                username: email,
                passwordHash: password,
                name: 'bob',
              }, function(err, user) {
                if (err) {return done(err); }
                // Successfully created new user
                return done(null, user);
              });
            }
            return done(null, false, {
              message: 'User with that email already exists.'
            });
          });
        })
    );
};
