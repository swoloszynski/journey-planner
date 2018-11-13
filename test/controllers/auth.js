/*jshint expr: true*/
'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const httpMocks = require('node-mocks-http');

const authController = require('../../src/server/controllers').auth;

describe('Auth Controller', () => {
  afterEach( () => {
    sandbox.restore();
  });

  describe('logout', () => {
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

  describe('renderSignup', () => {
    it('should render signup form and pass flash error message', () => {

      const fakeFlash = sandbox.stub().returns('womp');

      const req = httpMocks.createRequest({
        flash: fakeFlash,
      });

      const res = httpMocks.createResponse();

      authController.renderSignup(req, res);

      expect(fakeFlash.called).to.be.true;

      expect(res.statusCode).to.eql(200);

      const templateName = res._getRenderView();
      expect(templateName).to.eql('signup');

      const templateData = res._getRenderData();
      expect(templateData.title).to.eql('JP Signup');
      expect(templateData.message).to.eql('womp');
    });
  });

  describe('renderLogin', () => {
    it('should render login form and pass flash error message', () => {

      const fakeFlash = sandbox.stub().returns('womp');

      const req = httpMocks.createRequest({
        flash: fakeFlash,
      });

      const res = httpMocks.createResponse();

      authController.renderLogin(req, res);

      expect(fakeFlash.called).to.be.true;

      expect(res.statusCode).to.eql(200);

      const templateName = res._getRenderView();
      expect(templateName).to.eql('login');

      const templateData = res._getRenderData();
      expect(templateData.title).to.eql('JP Login');
      expect(templateData.message).to.eql('womp');
    });
  });
});
