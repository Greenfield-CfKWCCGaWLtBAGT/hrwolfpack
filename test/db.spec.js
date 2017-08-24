const mysql = require('mysql');
const request = require('request');
const expect = require('chai').expect;
const cred = require('../config');
const server = require('../server/index.js');
const db = require('../db/index.js');

describe('Persistent Users', () => {
  let dbConnection;

  beforeEach((done) => {
    dbConnection = mysql.createConnection({
      user: cred.db_username,
      password: cred.db_password,
      database: cred.db_name
    });
    dbConnection.connect();

    let tablename = 'users';

    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(() => {
    dbConnection.end();
  });

  it('Should insert new users into the database', () => {
    return db.User.create({
      username: 'dennis', 
      password: 'rodman'
    })
    .then(() => {
      console.log('user created');
      db.User.findOne({
        where: {
          username: 'dennis',
          password: 'rodman'
        },
        raw: true
      })
    .then((result) => {
      console.log(result);
      expect(result.username).to.equal('dennis');
      expect(result.password).to.equal('rodman');
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
    })
  })
  
});