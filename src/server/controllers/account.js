'use strict';

 module.exports = {
  render: (req, res) => {
    res.render('profile', {
      title: 'JP Profile',
      user: req.user,
    });
  },
};
