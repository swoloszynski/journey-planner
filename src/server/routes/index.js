'use strict';

const usersController = require('../controllers').users;
var passport = require("../../../config/passport");
const session      = require('express-session');

var db = require("../../models");

module.exports = (app) => { /* jshint unused: false */
  console.log('init routes');
  app.set('views', './src/views');
  app.set('view engine', 'pug');

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:username', usersController.retrieve);

  app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.render('index', {
      title: 'Journey Planner',
      message:'Hello World!'
    });
  });

  // ------- AUTHENTICATION ROUTES ------- //

  // --- Views --- //

  // Login form
  app.get('/login', function(req, res) {
    res.render('login', {
      title: 'JP Login',
    });
  });

  // Sign up form
  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'JP Signup',
    });
  });

  // Profile view (authenticated users only)
  app.get('/profile', function(req, res) {
    res.render('profile', {
      title: 'JP PROFILE = IT WORKED',
    });
  });

  // --- Handle data --- //

  // Receive Login Submission
  // app.post("/login", passport.authenticate("local"), function(req, res) {
  //     // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  //     // So we're sending the user back the route to the members page because the redirect will happen on the front end
  //     // They won't get this or even be able to access this page if they aren't authed
  //     res.json("/profile");
  //   });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        console.log('err', err);
        return next(err);
      }

      if (!user) {
        console.log('no user returned', user);
        return res.redirect('/login');
      }

      console.log('user', user);
      return res.redirect('/profile');

      // req.logIn(user, function(err) {
      //   if (err) { return next(err); }
      //   return res.redirect('/profile');
      // });
    })(req, res, next);
  });

   // app.post('/login', passport.authenticate('local', {
   //      successRedirect : '/profile', // redirect to the secure profile section
   //      failureRedirect : '/', // redirect back to the signup page if there is an error
   //      // failureFlash : true // allow flash messages
   //  }));


  // Receive Signup Submission
  app.post("/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      name: req.body.email,
      username: req.body.email,
      passwordHash: req.body.password,

    }).then(function() {
      console.log('after creating user');
      res.redirect(302, "/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // app.post('/signup',
  //   passport.authenticate(
  //     'local-signup',
  //     {
  //       successRedirect: '/',
  //       failureRedirect: '/login',
  //     })
  // );

  // ------- END AUTHENTICATION ROUTES ------- //

  // Catch-all route must be last
  app.get('*', function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Oops! Route note found.');
  });
};
