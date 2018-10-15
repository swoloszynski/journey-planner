'use strict';

const request = require('supertest');
const app = require('../app');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../src/models').User;

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('Authentication', () => {
  it('should GET /login', (done) => {
    request(app)
      .get('/login')
      .expect(200)
      .end(done);
  });

  it('should GET /signup', (done) => {
    request(app)
      .get('/signup')
      .expect(200)
      .end(done);
  });

  it('should redirect to /login on successful POST /signup', (done) => {
    const data = {
      email: 'jose@email.com',
      password: 'secretpassword',
    };

    const userStub = sinon.stub(User, 'create').resolves();  /*jshint unused:false*/

    request(app)
      .post('/signup')
      .send(data)
      .expect(302)
      .end((err, res) => {
        expect(res.header.location).to.include('/login');
        done();
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

describe('GET /doesntexist', () => {
  it('should return 404 Not Found', (done) => {
    request(app)
      .get('/doesntexist')
      .expect(404)
      .end(done);
  });
});
