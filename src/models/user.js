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
  }, {});

  // Hash a plaintext password before a User is created.
  User.hook('beforeCreate', function(user) {
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    user.passwordHash = bcrypt.hashSync(user.passwordHash, salt);
  });

  User.associate = function(models) { /* jshint unused: false */
    // associations can be defined here
  };
  return User;
};
