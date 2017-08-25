var Sequelize = require('sequelize');

var pg = require('pg');
pg.defaults.ssl = true;

var env = process.env.NODE_ENV || 'development';

var db_url;
var db;
var cloud_db = 'postgres://jqahiwyjqaactz:83076ed0161f024949784ebfa535af464ed1700aad120329dfdaec813a8825d0@ec2-54-163-227-202.compute-1.amazonaws.com:5432/dakqlsj082mah5';

if (env === 'test' || env === 'production') {
  db_url = cloud_db;
  db = new Sequelize(db_url, {
    dialect: 'mysql'
  });
} else {
  var creds = require('../config.js');
  db = new Sequelize(creds.db_name, creds.db_username, creds.db_password, {
    host: creds.db_host,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false
    }
  });
}

//test connection
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


//define schema
var User = db.define('user', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {underscored: true});

var Listing = db.define('listing', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.TEXT,
	description: Sequelize.TEXT,
	image_url: Sequelize.TEXT,
  url: Sequelize.TEXT,
  initializer: { type: Sequelize.INTEGER, defaultValue: 1},
  price: Sequelize.DECIMAL(5, 2),
  completed: { type: Sequelize.BOOLEAN, defaultValue: false},
  arrived: { type: Sequelize.BOOLEAN, defaultValue: false},
  packed: { type: Sequelize.BOOLEAN, defaultValue: false},

  location: Sequelize.TEXT,
	lat: { type: Sequelize.DECIMAL(10, 8), defaultValue: 0 },
	lng: { type: Sequelize.DECIMAL(11, 8), defaultValue: 0 },

  num_of_participants:{ type: Sequelize.INTEGER, defaultValue: 4},
  created_dt: Sequelize.DATE
}, {underscored: true});


var UserListings = db.define('userListings', {
  received: { type: Sequelize.BOOLEAN, defaultValue: false}
});

User.belongsToMany(Listing, { through: UserListings});
Listing.belongsToMany(User, { through: UserListings});
//create Users and listings table

User.sync()
.then(() => {
  return Listing.sync();
})
.then(() => {
  return UserListings.sync();
});


exports.User = User;
exports.Listing = Listing;
exports.UserListings = UserListings;
