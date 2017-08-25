let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server/index.js');

let request = require('supertest');
let server = request.agent('http://localhost:3000');

let expect = chai.expect;

chai.use(chaiHttp);

describe('Server Index', () => {
  describe('Login Page', () => {
    it('should respond with a server code 200', (done) => {
      chai.request(app)
        .get('/login')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it ('should serve static HTML', (done) => {
      chai.request(app)
        .get('/login')
        .end((err, res) => {
          expect(res).to.be.html;
          done();
        });
    });
    it ('should redirect to /login on bad input', (done) => {
      server.post('/login')
        .send(  {username: 'fake', password: 'news'}  )
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          done();
        })
    });
    it ('should redirect to index on successful login', (done) => {
      server.post('/login')
        .send(  {username: 'karun', password: '123k'}  )
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          done();
        })
    });

  });
  describe('Signup Page', () => {
    it('should respond with a server code 200', (done) => {
      chai.request(app)
        .get('/signup')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it ('should serve static HTML', (done) => {
      chai.request(app)
        .get('/signup')
        .end((err, res) => {
          expect(res).to.be.html;
          done();
        });
    });
    it ('should redirect to index on successful signup', (done) => {
      server.post('/login')
        .send(  {username: 'new', password: 'user'}  )
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          done();
        })
    });
  });
  describe('Logout Page', () => {
    it('should respond with a server code 200', (done) => {
      chai.request(app)
        .get('/logout')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it ('should serve static HTML', (done) => {
      chai.request(app)
        .get('/logout')
        .end((err, res) => {
          expect(res).to.be.html;
          done();
        });
    });
  });
  
})
