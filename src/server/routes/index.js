'use strict';

const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const configuredPassport = require('../../../config/passport');
const auth = require('../middleware/auth');

module.exports = (app) => {
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
      message:'Hello World!',
      user: req.user,
    });
  });

  // ------- AUTHENTICATION ROUTES ------- //

  // --- Views --- //

  // Profile view (authenticated users only)
  app.get('/profile', auth.required, function(req, res) {
    res.render('profile', {
      title: 'JP Profile',
      user: req.user,
    });
  });

  // Sign up form
  app.get('/signup', function(req, res) {
    const message = req.flash('error');
    const data = {
      title: 'JP Signup',
      message: message,
    };
     res.render('signup', data);
  });

  // Login form
  app.get('/login', function(req, res) {
    const message = req.flash('error');
    const data = {
      title: 'JP Login',
      message: message,
    };
     res.render('login', data);
  });

  // --- Handle data --- //

  // Log out
  app.get('/logout', authController.logout);

  // Receive Signup Submission
  app.post('/signup', configuredPassport.authenticate(
    'local-signup',
    {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash : true,
    })
  );

  // Receive Login Submission
  app.post('/login', configuredPassport.authenticate(
    'local-login',
    {
      successRedirect : '/profile',
      failureRedirect : '/login',
      failureFlash : true,
    }));

  // ------- END AUTHENTICATION ROUTES ------- //

  // Catch-all route must be last
  app.get('*', function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Oops! Route note found.');
  });
};
