/*jshint expr: true*/
'use strict';

const chai = require('chai');
const expect = chai.expect;

const httpMocks = require('node-mocks-http');

const homeController = require('../../src/server/controllers').home;

describe('Home Controller', () => {
  describe('render', () => {
    it('should render index template if no user', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      homeController.render(req, res);

      expect(res.statusCode).to.eql(200);

      const templateName = res._getRenderView();
      expect(templateName).to.eql('index');

      const templateData = res._getRenderData();
      expect(templateData.title).to.eql('Journey Planner');
      expect(templateData.message).to.eql('Hello World!');
      expect(templateData.user).to.be.undefined;
    });

    it('should render index template and pass user data if exists', () => {
      const req = httpMocks.createRequest({
        user: {
          pretend: 'user',
        },
      });
      const res = httpMocks.createResponse();

      homeController.render(req, res);

      expect(res.statusCode).to.eql(200);

      const templateName = res._getRenderView();
      expect(templateName).to.eql('index');

      const templateData = res._getRenderData();
      expect(templateData.title).to.eql('Journey Planner');
      expect(templateData.user).to.eql({ pretend: 'user' });
    });
  });
});
