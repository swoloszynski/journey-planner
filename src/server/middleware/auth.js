'use strict';

module.exports = {
  required: (req, res, next) => {
    if (req.user) {
      return next();
    }
    res.redirect('/login');
  },
};
