'use strict';

const request = require('supertest');
const app = require('../app');

describe('GET /app', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/app')
      .expect(200)
      .end(done);
  });
});

describe('GET /api', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api')
      .expect(200)
      .expect({
        message: 'Welcome to the API!'
      })
      .end(done);
  });
});

describe('GET /', () => {
  it('should return 404 Not Found', (done) => {
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });
});
