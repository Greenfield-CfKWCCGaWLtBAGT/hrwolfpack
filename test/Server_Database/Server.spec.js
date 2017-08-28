let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../server/index.js');

let request = require('supertest');
let url = process.env.NODE_ENV || 'http://localhost:3000';
let server = request.agent(url);

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

  describe('GET /messages', () => {
    it('should respond with an array of messages from the database', () => {
      server.get('messages', () => {
        chai.request(app)
          .get('/messages')
          .then((res) => {
            console.log(res);
            expect(res).to.have.status(200);
            expect(res).to.be.an.instanceOf(Array);
            expect(res[0]).to.have.property('message');
            expect(res[0]).to.have.property('username');
            expect(res[0]).to.have.property('listing_name');
          })
          .catch((err) => {
            console.log('Error: ', err);
          })
      })
    })
  })
  
})

describe('Routes.js', () => {
  describe('GET /listings', () => {
    it('should respond with an array of messages from the database', () => {
      server.get('listings', () => {
        chai.request(app)
          .get('/listings')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.an.instanceOf(Array);
            expect(res[0]).to.have.property('price');
            expect(res[0]).to.have.property('name');
            expect(res[0]).to.have.property('location');
          })
          .catch((err) => {
            console.log('Error: ', err);
          })
      })
    })
  })

  xdescribe('GET /user', () => {

  });

  xdescribe('POST /listingStatus', () => {

  });

  xdescribe('GET /listing', () => {

  });

  xdescribe('GET /newListings', () => {

  });

  xdescribe('GET /joinedListings', () => {

  });

  xdescribe('GET /initiatedListings', () => {

  });

});
