'use strict';

const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const sandbox = sinon.createSandbox();

const app = require('../app');
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
  let createStub;
  let findOneStub;

  beforeEach(function() {
    createStub = sandbox.stub(User, 'create');
    findOneStub = sandbox.stub(User, 'findOne');
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('Signup', () => {
    it('should GET /signup', (done) => {
      request(app)
        .get('/signup')
        .expect(200)
        .end(done);
    });

    it('should redirect to /login on successful POST /signup', (done) => {
      findOneStub.resolves(false);
      createStub.resolves({ new: 'user' });

      const data = {
        email: 'jose@email.com',
        password: 'secretpassword',
      };

      request(app)
        .post('/signup')
        .send(data)
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.include('/login');
          done();
        });
    });

    it('should redirect to /signup on failed POST /signup when user exists', (done) => {
      findOneStub.resolves({ existing: 'user' });

      const data = {
        email: 'jose@email.com',
        password: 'secretpassword',
      };

      request(app)
        .post('/signup')
        .send(data)
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.include('/signup');
          done();
        });
    });

    it('should redirect to /signup on failed POST /signup when user creation fails', (done) => {
      findOneStub.resolves(false);
      createStub.resolves(null);

      const data = {
        email: 'jose@email.com',
        password: 'secretpassword',
      };

      request(app)
        .post('/signup')
        .send(data)
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.include('/signup');
          done();
        });
    });
  });

  describe('Login', () => {
    it('should GET /login', (done) => {
      request(app)
        .get('/login')
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

describe('GET /doesntexist', () => {
  it('should return 404 Not Found', (done) => {
    request(app)
      .get('/doesntexist')
      .expect(404)
      .end(done);
  });
});
