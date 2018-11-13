/*jshint expr: true*/
'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const usersController = require('../../src/server/controllers').users;
const User = require('../../src/models').User;

describe('Users Controller', () => {
  afterEach( () => {
    sandbox.restore();
  });

  describe('create', () => {
    let createStub;
    let findStub;

    beforeEach(function() {
      createStub = sandbox.stub(User, 'create');
      findStub = sandbox.stub(User, 'findOne');
    });

    it('should create a new user', () => {
      createStub.resolves({ new: 'user' });

      const fakeReq = {
        body: {
          username: 'diogo3',
          name: 'Diogo',
        }
      };

      const fakeRes = {
        status: function(status) {
          expect(status).to.eql(201);
          return {
            send: sandbox.fake(),
          };
        },
      };

      usersController.create(fakeReq, fakeRes);
      expect(createStub.called).to.be.true;
    });
  });

  describe('list', () => {
    let allStub;

    beforeEach(function() {
      allStub = sandbox.stub(User, 'all');
    });

    it('should get all users', () => {
      allStub.resolves([{ new: 'user' }]);

      const fakeReq = {};
      const fakeRes = {
        status: function(status) {
          expect(status).to.eql(200);
          return {
            send: sandbox.fake(),
          };
        },
      };

      usersController.list(fakeReq, fakeRes);
      expect(allStub.called).to.be.true;
    });
  });

  describe('retrieve', () => {
    let findStub;

    beforeEach(function() {
      findStub = sandbox.stub(User, 'findOne');
    });

    it('should search for a user', () => {
      findStub.resolves({ new: 'user' });

      const fakeReq = {
        params: {
          username: 'jane',
        },
      };

      const fakeRes = {
        status: function(status) {
          expect(status).to.eql(200);
          return {
            send: sandbox.fake(),
          };
        },
      };

      usersController.retrieve(fakeReq, fakeRes);
      expect(findStub.called).to.be.true;
    });
  });
});
