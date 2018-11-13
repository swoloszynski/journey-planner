/*jshint expr: true*/
'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const httpMocks = require('node-mocks-http');

const authController = require('../../src/server/controllers').auth;

describe('Auth Controller', () => {
  describe('logout', () => {
    afterEach( () => {
      sandbox.restore();
    });

    it('should call req.logout()', () => {

      const req = httpMocks.createRequest({
        logout: sandbox.fake(),
      });

      const res = httpMocks.createResponse();

      authController.logout(req, res);

      expect(req.logout.called).to.be.true;
      expect(res.statusCode).to.eql(302);
      expect(res._getRedirectUrl()).to.eql('/');
    });
  });
});
