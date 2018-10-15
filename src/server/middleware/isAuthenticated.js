// Middleware for checking if a user is authenticated.
// If authenticated, proceed.
// If not authenticated, redirect to login page.
'use strict';

module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  console.log('isAuthenticated middleware: req.user', req.user);
  if (req.user) {
    return next();
  }

  // If the user isnt' logged in, redirect them to the login page
  return res.redirect('/login');
};
