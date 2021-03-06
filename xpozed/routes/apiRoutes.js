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
    db.Chatroom.create({
      name: req.body.name
    }).then(function(dbChatroom) {
      rooms[req.body.name] = { users: {} };
      res.redirect("/rooms?room=" + dbChatroom.id);
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
        res.redirect("/");
      } else {
        //start session
        req.session.UID = user.id;
        req.session.UNAME = user.username;
        
        res.redirect("/");
      }
    });
  });

  app.post("/api/signup", function(req, res) {
    db.Users.create({
      username: req.body.username,
      password: req.body.password
    }).then(function(user){
      req.session.UID = user.id;
      req.session.UNAME = user.username;

        res.redirect("/home");
    })
  });

  // Delete an example by id
  app.delete("/api/chatrooms/:id", function(req, res) {
    db.Chatroom.destroy({ where: { id: req.params.id } }).then(function(dbChatroom) {
      res.json(dbChatroom);
    });
  });
};