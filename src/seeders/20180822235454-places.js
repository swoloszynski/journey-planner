'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Places', [
        {
          name: 'London',
          location: null,
          url: null,
          notes: null,
          userId: 1,
        },
        {
          name: 'Amsterdam AirBnB',
          location: '234 Stroopwafel Strasse',
          url: 'https://maps.google.com/234-stroopwafel',
          notes: null,
          userId: 3,
        },
        {
          name: 'Marks Porto Condo',
          location: 'Rua do Infante 26',
          url: 'https://maps.google.com/rua-do-infante-26',
          notes: null,
          userId: 2,
        },

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Places', null, {});
  }
};
