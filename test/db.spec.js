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

    //dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(() => {
    dbConnection.end();
  });

  it('Should insert new users into the database', () => {
    db.User.create({
      username: 'dennis', 
      password: 'rodman'
    });
    //.then(())
  });

});