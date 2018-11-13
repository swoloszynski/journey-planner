/*jshint expr: true*/
'use strict';

const chai = require('chai');
const expect = chai.expect;

const pug = require('pug');

const path = require('path');
const app = require('../../app.js');

describe('Views - Home', () => {
  const file = path.join(app.get('views'), 'index.pug');
  const compiledFunction = pug.compileFile(file);

  describe('user data exists', () => {
    const userData = {
      username: 'amazinggrace123',
      name: 'Grace',
    };
    it('should display username', () => {
      const renderedTemplate = compiledFunction({
        message: 'Journey Planner!',
        user: userData,
      });
      expect(renderedTemplate).to.contain('Welcome Grace');
    });

    it('should not display login or signup links', () => {
      const renderedTemplate = compiledFunction({
        message: 'Journey Planner!',
        user: userData,
      });
      expect(renderedTemplate).to.not.contain('Log In');
      expect(renderedTemplate).to.not.contain('Sign Up');
    });
  });

  describe('user data does not exist', () => {
    it('should not display login or signup links', () => {
      const renderedTemplate = compiledFunction({
        message: 'Journey Planner!',
      });
      expect(renderedTemplate).to.not.contain('Welcome');
      expect(renderedTemplate).to.contain('Log In');
      expect(renderedTemplate).to.contain('Sign Up');
    });
  });

});
