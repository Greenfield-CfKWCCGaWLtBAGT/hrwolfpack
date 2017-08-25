let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server/index.js');

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
      chai.request(app)
        .post('/login')
        .send({ username: 'fake', password: 'user'  })
        .end((err, res) => {
          expect(res).to.redirectTo('http://localhost:3000/login');
          done();
        });
    });
    it ('should redirect to index on successful login', (done) => {
      chai.request(app)
        .post('/login')
        .send({ user: 'karun', password: '123k' })
        .end((err, res) => {
          expect(res).to.redirectTo('http://localhost:3000/');
          done();
        });
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
