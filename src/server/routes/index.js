'use strict';

const usersController = require('../controllers').users;
const configuredPassport = require('../../../config/passport');

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
      message:'Hello World!'
    });
  });

  // ------- AUTHENTICATION ROUTES ------- //

  // --- Views --- //

  // Profile view (authenticated users only)
  app.get('/profile', function(req, res) {
    res.render('profile', {
      title: 'JP Profile',
    });
  });

  // Sign up form
  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'JP Signup',
    });
  });

  // Log in form

  // --- Handle data --- //

  // Receive Signup Submission
  app.post('/signup', configuredPassport.authenticate(
    'local-signup',
    {
      successRedirect: '/profile',
      failureRedirect: '/signup',
    })
  );

  // Receive Login Submission

  // ------- END AUTHENTICATION ROUTES ------- //

  // Catch-all route must be last
  app.get('*', function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Oops! Route note found.');
  });
};
