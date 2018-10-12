'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: DataTypes.TEXT,
    contact: DataTypes.TEXT
  });

  // Check if an unhashed password provided by the user matches the
  // hashed password stored in the database.
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = function(models) { /* jshint unused: false */
    // associations can be defined here
  };
  return User;
};
