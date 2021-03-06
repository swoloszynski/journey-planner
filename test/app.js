/*jshint expr: true*/
'use strict';

const request = require('supertest');

const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
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

    it('should redirect to /profile on successful POST /signup', (done) => {
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
          expect(res.header.location).to.include('/profile');
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

    it('should redirect to /profile on successful POST /login', (done) => {
      const validPasswordStub = sandbox.stub().returns(true);
      findOneStub.resolves({ validPassword: validPasswordStub });
       const data = {
        email: 'jose@email.com',
        password: 'secretpassword',
      };
       request(app)
        .post('/login')
        .send(data)
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.include('/profile');
          expect(validPasswordStub.called).to.be.true;
          done();
        });
    });

     it('should redirect to /login on failed POST /login when the email doesn\'t match a user', (done) => {
      findOneStub.resolves(false);
       const data = {
        email: 'jose@email.com',
        password: 'secretpassword',
      };
       request(app)
        .post('/login')
        .send(data)
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.include('/login');
          done();
        });
    });

    it('should redirect to /login on failed POST /login when the password is invalid', (done) => {
      const validPasswordStub = sandbox.stub().returns(false);
      findOneStub.resolves({ validPassword: validPasswordStub });
       const data = {
        email: 'jose@email.com',
        password: 'secretpassword',
      };
       request(app)
        .post('/login')
        .send(data)
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.include('/login');
          expect(validPasswordStub.called).to.be.true;
          done();
        });
    });
  });
});

describe('Account', () => {
  describe('Profile', () => {
    it('should GET /profile and redirect when not logged in', (done) => {
      request(app)
        .get('/profile')
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.include('/login');
          done();
        });
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
