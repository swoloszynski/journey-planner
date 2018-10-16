'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { /* jshint unused: false */
      return queryInterface.bulkInsert('Users', [
        {
          username: 'btravs',
          email: 'btravs@email.com',
          passwordHash: null,
          name: 'ben travis',
          notes: null,
          contact: 'btravs@mail.com',
        },
        {
          username: 'samwolo',
          email: 'samwolo@email.com',
          passwordHash: null,
          name: 'sam',
          notes: null,
          contact: '+1 123 456 7890',
        },
        {
          username: 'ahmedmuhamo1',
          email: 'ahmed@email.com',
          passwordHash: null,
          name: 'ahmed muhamo',
          notes: 'Deathly allergic to peanuts',
          contact: '+34 123 57 824',
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => { /* jshint unused: false */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
