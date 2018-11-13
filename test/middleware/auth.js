/*jshint expr: true*/
'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const auth = require('../../src/server/middleware/auth');

describe('Auth middleware', () => {
  describe('required', () => {
    afterEach( () => {
      sinon.restore();
    });

    it('should call next() when user exists', () => {
      const fakeReq = {
        user: true,
      };
      const fakeRes = {
        redirect: sinon.fake(),
      };
      const fakeNext = sinon.fake();

      auth.required(fakeReq, fakeRes, fakeNext);

      expect(fakeRes.redirect.called).to.be.false;
      expect(fakeNext.called).to.be.true;
    });

    it('should redirect to login if user does not exist', () => {
      const fakeReq = {};
      const fakeRes = {
        redirect: sinon.fake(),
      };
      const fakeNext = sinon.fake();

      auth.required(fakeReq, fakeRes, fakeNext);

      expect(fakeRes.redirect.called).to.be.true;
      expect(fakeNext.called).to.be.false;
    });
  });
});
