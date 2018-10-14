'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Users', 'passwordHash', {
        type: Sequelize.STRING,
      });
  },

  down: (queryInterface, Sequelize) => {  /*jshint unused:false*/
      return queryInterface.removeColumn('Users', 'passwordHash');
  }
};
