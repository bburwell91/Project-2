var db = require("../models");

module.exports = function(app) {
  // Get all chatrooms
  app.get("/api/chatrooms/", function(req, res) {
    db.Chatroom.findAll({}).then(function(dbChatroom) {
      res.json(dbChatroom);
    });
  });

  // Get route for returning posts of a specific chatroom
  app.get("/api/chatrooms/:name", function(req, res) {
    db.Chatroom.findAll({
      where: {
        name: req.params.name
      }
    }).then(function(dbChatroom) {
      res.json(dbChatroom);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/chatrooms/:id", function(req, res) {
    db.Chatroom.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbChatroom) {
      res.json(dbChatroom);
    });
  });

  // Create a new chatroom
  app.post("/api/chatrooms", function(req, res) {
    console.log(req.body);
    db.Chatroom.create({
      // id: req.body.id,
      name: req.body.name,
      // createdAt: req.body.createdAt,
      // updatedAt: req.body.updatedAt
    }).then(function(dbChatroom) {
      rooms[req.body.name] = { users: {} };
      res.redirect("/" + req.body.name);
    });
  });

  app.post("/api/chatroom/comments", function(req, res) {
    db.Comments.create({
      text: req.body.message,
      UserId: req.session.UID,
      ChatroomId: req.body.id
    });
  });

  app.post("/api/login", function(req, res) {
    db.Users.findOne({
      where: {username: req.body.username, password: req.body.password }
    }).then(function(user){
      if (!user){
        console.log("login failed");
        res.redirect("/");
      } else {
        //start session
        req.session.UID = user.id;
        res.redirect("/");
      }
    });
  });

  // Delete an example by id
  app.delete("/api/chatrooms/:id", function(req, res) {
    db.Chatroom.destroy({ where: { id: req.params.id } }).then(function(dbChatroom) {
      res.json(dbChatroom);
    });
  });
};

// Code below is for the chatrooms once the database is set up

// module.exports = function(app) {
//   // Get all chatrooms
//   app.get("/api/chatrooms", function(req, res) {
//     db.Chatrooms.findAll({}).then(function(dbChatrooms) {
//       res.json(dbChatrooms);
//     });
//   });

//   // Create a new chatroom
//   app.post("/api/chatrooms", function(req, res) {
//     db.Chatrooms.create(req.body).then(function(dbChatrooms) {
//       res.json(dbChatrooms);
//     });
//   });

//   // Delete a chatroom by id
//   app.delete("/api/chatrooms/:id", function(req, res) {
//     db.Chatrooms.destroy({ where: { id: req.params.id } }).then(function(dbChatrooms) {
//       res.json(dbChatrooms);
//     });
//   });

//   // Get all users
//   app.get("/api/users", function(req, res) {
//     db.Users.findAll({}).then(function(dbUsers) {
//       res.json(dbUsers);
//     });
//   });

//   // Create a new user
//   app.post("/api/users", function(req, res) {
//     db.Users.create(req.body).then(function(dbUsers) {
//       res.json(dbUsers);
//     });
//   });

//   // Delete a user by id
//   app.delete("/api/users/:id", function(req, res) {
//     db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
//       res.json(dbUsers);
//     });
//   });
// };
