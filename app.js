'use strict';

const config   = require('./config');
const PORT     = config.port;
const express  = require('express');
const db       = require("./src/models");
const routes   = require('./src/server/routes');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

// Initialize app
const app = express();

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

// Require routes
routes(app);

// Run server and log database info
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

module.exports = app;
