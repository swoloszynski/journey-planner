'use strict';

const usersController = require('../controllers').users;
var passport = require('../../../config/passport');

module.exports = (app) => { /* jshint unused: false */
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
  app.post('/login', passport.authenticate(
    'local-login',
    {
      successRedirect : '/profile',
      failureRedirect : '/login',
    }));


  // Receive Signup Submission
  app.post('/signup', passport.authenticate(
    'local-signup',
    {
      successRedirect: '/login',
      failureRedirect: '/signup',
    })
  );

  // ------- END AUTHENTICATION ROUTES ------- //

  // Catch-all route must be last
  app.get('*', function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Oops! Route note found.');
  });
};
