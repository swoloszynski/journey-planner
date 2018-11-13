'use strict';

 module.exports = {
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
  renderSignup(req, res) {
    const message = req.flash('error');
    const data = {
      title: 'JP Signup',
      message: message,
    };
     res.render('signup', data);
  },
  renderLogin(req, res) {
    const message = req.flash('error');
    const data = {
      title: 'JP Login',
      message: message,
    };
     res.render('login', data);
  }
};
