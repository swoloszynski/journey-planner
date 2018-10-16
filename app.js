'use strict';

const express = require('express');

const config = require('./config');
const PORT   = config.port;
const db     = require('./src/models');

const bodyParser = require('body-parser');
const morgan     = require('morgan');

const app = express();

if (config.env === 'development') {
  // log every request
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/server/routes')(app);

if (config.env === 'development') {
  // Run server and log database info
  db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
    });
  });
} else {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = app;
