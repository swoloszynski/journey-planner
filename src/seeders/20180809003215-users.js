'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { /* jshint unused: false */
      return queryInterface.bulkInsert('Users', [
        {
          username: 'btravs',
          name: 'ben travis',
          notes: null,
          contact: 'btravs@mail.com',
          email: 'btravs@email.com',
          passwordHash: null,
        },
        {
          username: 'samwolo',
          name: 'sam',
          notes: null,
          contact: '+1 123 456 7890',
          email: 'samwolo@email.com',
          passwordHash: null,
        },
        {
          username: 'ahmedmuhamo1',
          name: 'ahmed muhamo',
          notes: 'Deathly allergic to peanuts',
          contact: '+34 123 57 824',
          email: 'ahmed@email.com',
          passwordHash: null,
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => { /* jshint unused: false */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
