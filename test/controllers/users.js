/*jshint expr: true*/
'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const httpMocks = require('node-mocks-http');

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

      var req  = httpMocks.createRequest({
        body: {
          username: 'diogo23',
          name: 'Diogo',
        }
      });

      var res = httpMocks.createResponse();

      usersController.create(req, res);
      expect(createStub.called).to.be.true;
      expect(createStub.calledWith({
        username: 'diogo23',
        name: 'Diogo',
      })).to.be.true;
      console.log('final res.statusCode', res.statusCode);

      expect(res.statusCode).to.eql(201);
    });

    it('should return 400 if user creation fails', () => {
      const err = new Error('womp');
      createStub.throws(err);

      const fakeReq = {
        body: {
          username: 'diogo3',
          name: 'Diogo',
        }
      };

      const fakeRes = {
        status: function(status) {
          expect(status).to.eql(200);
          expect(createStub.called).to.be.true;
          return {
            send: sandbox.fake(),
          };
        },
      };

      expect(usersController.create.bind(usersController, fakeReq, fakeRes))
        .to.throw('womp');
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
