/*jshint expr: true*/
'use strict';

const chai = require('chai');
const expect = chai.expect;

const httpMocks = require('node-mocks-http');

const homeController = require('../../src/server/controllers').home;

describe('Auth Controller', () => {
  describe('render', () => {
    it('should render index template', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      homeController.render(req, res);

      expect(res.statusCode).to.eql(200);

      const templateName = res._getRenderView();
      expect(templateName).to.eql('index');

      const templateData = res._getRenderData();
      expect(templateData.title).to.eql('Journey Planner');
      expect(templateData.message).to.eql('Hello World!');
    });
  });
});
