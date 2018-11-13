/*jshint expr: true*/
'use strict';

const chai = require('chai');
const expect = chai.expect;

const httpMocks = require('node-mocks-http');

const accountController = require('../../src/server/controllers').account;

describe('Account Controller', () => {
  describe('render', () => {
    it('should render profile template if no user', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      accountController.render(req, res);

      expect(res.statusCode).to.eql(200);

      const templateName = res._getRenderView();
      expect(templateName).to.eql('profile');

      const templateData = res._getRenderData();
      expect(templateData.title).to.eql('JP Profile');
      expect(templateData.user).to.be.undefined;
    });

    it('should render profile template and pass user data if exists', () => {
      const req = httpMocks.createRequest({
        user: {
          pretend: 'user',
        },
      });
      const res = httpMocks.createResponse();

      accountController.render(req, res);

      expect(res.statusCode).to.eql(200);

      const templateName = res._getRenderView();
      expect(templateName).to.eql('profile');

      const templateData = res._getRenderData();
      expect(templateData.title).to.eql('JP Profile');
      expect(templateData.user).to.eql({ pretend: 'user' });
    });
  });
});
