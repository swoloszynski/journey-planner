'use strict';

const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('Authentication', () => {
  describe('Signup', () => {
    it('should GET /signup', (done) => {
      request(app)
        .get('/signup')
        .expect(200)
        .end(done);
    });
  });
});

describe('Account', () => {
  describe('Profile', () => {
    it('should GET /profile', (done) => {
      request(app)
        .get('/profile')
        .expect(200)
        .end(done);
    });
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

describe('404 Not Found', () => {
  it('should return 404 Not Found', (done) => {
    request(app)
      .get('/doesntexist')
      .expect(404)
      .end(done);
  });
});
