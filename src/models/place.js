'use strict';
module.exports = (sequelize, DataTypes) => {
  var Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    url: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {});
  Place.associate = function(models) {
    // associations can be defined here
  };
  return Place;
};
