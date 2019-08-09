// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");
// var mysql = require("mysql");
// var connection;

// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "xposed_db"
//   });
// };

if (process.env.JAWSDB_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: "mysql",
    protocol: "mysql",
    logging: true
  });
} else {
  // the application is executed on the local machine
  sequelize = new Sequelize("mysql:///xposed_db");
}

// // Creates mySQL connection using Sequelize.
// var sequelize = new Sequelize("xposed_db", "root", "password", {
//   host: "localhost",
//   port: 8080,
//   dialect: "mysql",
//   pool: { 
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

// Exports the connection for other files to use
module.exports = sequelize;
