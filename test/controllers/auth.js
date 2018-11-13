/*jshint expr: true*/
'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const authController = require('../../src/server/controllers').auth;

describe('Auth Controller', () => {
  describe('logout', () => {
    afterEach( () => {
      sandbox.restore();
    });

    it('should call req.logout()', () => {
      const fakeReq = {
        logout: sandbox.fake(),
      };
      const fakeRes = {
        redirect: sinon.fake(),
      };
      authController.logout(fakeReq, fakeRes);
      expect(fakeReq.logout.called).to.be.true;
      expect(fakeRes.redirect.called).to.be.true;
    });
  });
});
