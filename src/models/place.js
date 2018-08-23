'use strict';
module.exports = (sequelize, DataTypes) => {
  var Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: DataTypes.STRING,
    url: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {});
  Place.associate = function(models) {
    models.Place.belongsTo(models.User);
  };
  return Place;
};
