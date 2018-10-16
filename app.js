'use strict';

const express = require('express');

const config = require('./config');
const PORT   = config.port;
const db     = require('./src/models');
const routes = require('./src/server/routes');

const bodyParser = require('body-parser');
const morgan     = require('morgan');
const flash      = require('connect-flash');
const session    = require('express-session');

const configuredPassport = require('./config/passport');
const app = express();

if (config.env === 'development') {
  // log every request
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up sessions for persistent login
app.use(session({
  secret: config.sessionSecret,
}));

// Set up passport
app.use(configuredPassport.initialize());
app.use(configuredPassport.session());

routes(app);

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
