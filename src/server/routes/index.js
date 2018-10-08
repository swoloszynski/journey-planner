'use strict';

const usersController = require('../controllers').users;

module.exports = (app, passport) => { /* jshint unused: false */
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

  // Login Page
  app.get('/login', function(req, res) {
    res.render('login', {
      title: 'JP Login',
    });
  });

  // Process the login form
  // app.post('/login', passport fun here);

  // Signup page
  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'JP Signup',
    });
  });

  // process the signup form
  // app.post('/signup', passport fun here);

  // Profile page
  // Protected page; requires login
  // Route middleware isLoggedIn function will verify
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      title: 'JP Profile',
      user : req.user // get the user out of session and pass to template
    });
  });

  // Logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
    // if authenticated in the session, continue
    if (req.isAuthenticated()) {
      return next();
    }

    // if not, redirect to home page
    res.redirect('/');
  }

  // Catch-all route must be last
  app.get('*', function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Oops! Route note found.');
  });
};
