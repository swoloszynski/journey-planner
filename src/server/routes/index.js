'use strict';

const controllers = require('../controllers');
const usersController = controllers.users;
const authController = controllers.auth;
const homeController = controllers.home;
const accountController = controllers.account;

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

  app.get('/', homeController.render);

  // ------- AUTHENTICATION ROUTES ------- //

  // --- Views --- //

  // Profile view (authenticated users only)
  app.get('/profile', accountController.render);

  // Sign up form
  app.get('/signup', authController.renderSignup);

  // Login form
  app.get('/login', authController.renderLogin);

  // --- Handle data --- //

  // Logout
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
