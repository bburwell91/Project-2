var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Create a new example
//   app.post("/api/example", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

module.exports = function(app) {
  // Get all chatrooms
  app.get("/api/chatrooms", function(req, res) {
    db.Chatrooms.findAll({}).then(function(dbChatrooms) {
      res.json(dbChatrooms);
    });
  });

  // Create a new chatroom
  app.post("/api/chatrooms", function(req, res) {
    db.Chatrooms.create(req.body).then(function(dbChatrooms) {
      res.json(dbChatrooms);
    });
  });

  // Delete a chatroom by id
  app.delete("/api/chatrooms/:id", function(req, res) {
    db.Chatrooms.destroy({ where: { id: req.params.id } }).then(function(dbChatrooms) {
      res.json(dbChatrooms);
    });
  });

  // Get all users
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
