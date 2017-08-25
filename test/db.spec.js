const mysql = require('mysql');
const request = require('request');
const expect = require('chai').expect;
const db = require('../db/index.js');
const pg = require('pg');
pg.defaults.ssl = true;

describe('Tables', () => {

  describe('Users', () => {
    it('Should exist', () => {
      expect(db.User).to.exist;
    });
  });

  describe('Listings', () => {
    it('Should exist', () => {
      expect(db.Listing).to.exist;
    });
  });

  describe('UserListings', () => {
    it('Should exist', () => {
      expect(db.UserListings).to.exist;
    })
  })

});

describe('Persistent Listings', () => {
  it('Should get listings from the database', () => {
    db.Listing.findAll({
      raw: true
    })
    .then((listings) => {
      //console.log(listings);
      expect(listings[0]).to.have.property('name');
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
  })

});

describe('Persistent Users', () => {

  it('should get seeded users from the database', () => {
    return db.User.findOne({
      where: {
        username: 'dylan',
        password: '123d'
      }
    })
    .then((user) => {
      expect(user.username).to.equal('dylan');
      expect(user.password).to.equal('123d');
    })
    .catch((err) => {
      console.log('Error: ', err);
    })

  })

  it('should insert new users into the database', () => {
    return db.User.create({
      username: 'dennis', 
      password: 'rodman'
    })
    .then((user) => {
      return db.User.findOne({
        where: {
          username: 'dennis',
          password: 'rodman'
        },
        raw: true
      })
    .then((result) => {
      expect(result.username).to.equal('dennis');
      expect(result.password).to.equal('rodman');
      return db.User.destroy({
        where: {
          username: 'dennis'
        }
      })
    .then((rows) => {
      //console.log('deleting rows: ', rows);
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
    })
    })
  })

  xit('Should not create duplicate users', () => {
    return db.User.create({
      username: 'anthony',
      password: 'stephens'
    })
    .then((user) => {
      return db.User.create({
        username: 'anthony',
        password: 'uranus'
      })
    .then((user) => {
      return db.User.findAll({
        where: {
          username: 'anthony'
        },
        raw: true
      })
    .then((users) => {
      console.log(users);
      expect(users.length).to.equal(1);
      return db.User.destroy({
        where: {
          username: 'anthony'
        }
      })
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
    })
    })
  })

});