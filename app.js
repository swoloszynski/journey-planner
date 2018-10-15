'use strict';

const config   = require('./config');
const PORT     = config.port;
const express  = require('express');
const db       = require('./src/models');
const routes   = require('./src/server/routes');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const flash        = require('connect-flash');

const passport      = require('./config/passport');

// Initialize app
const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (config.env === 'development') {
  app.use(morgan('dev')); // log every request to the console
}
app.use(cookieParser()); // read cookies (needed for auth)

// Set up sessions for persistent login
app.use(session({
  secret: config.sessionSecret,
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Use flash for passing error messages stored in the session
app.use(flash());

// Require routes
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
