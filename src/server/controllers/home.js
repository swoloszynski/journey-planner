'use strict';

 module.exports = {
  render: (req, res) => {
    res.render('index', {
      title: 'Journey Planner',
      message:'Hello World!'
    });
  },
};
