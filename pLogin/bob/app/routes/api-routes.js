// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Chirp = require("../models/chirp.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps
  

  // Add a chirp
  app.post("/api/new", function(req, res) {

    console.log("Chirp Data:");
    console.log(req.body);

    Chirp.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    }).then(function(results) {
      // `results` here would be the newly created chirp
      res.end();
    });

  });

};