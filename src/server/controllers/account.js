'use strict';

 module.exports = {
  render: function (req, res) {
    res.render('profile', {
      title: 'JP Profile',
    });
  },
};
