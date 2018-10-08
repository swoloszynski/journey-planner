'use strict';
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
  User.associate = function(models) { /* jshint unused: false */
    // associations can be defined here
  };
  return User;
};
