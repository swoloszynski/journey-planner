'use strict';

const request = require('supertest');
const app = require('../app');
const chai = require('chai');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
