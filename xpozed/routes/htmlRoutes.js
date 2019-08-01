var db = require("../models");

module.exports = function(app) {

  rooms = {};

  app.get("/", function(req, res) {
    if (req.session.UID) {
      res.redirect("/home");
    } else {
      res.render('signup');
    }
  });

  // Load index page
  app.get("/home", function(req, res) {
    db.Chatroom.findAll().then(function(chatrooms){
      chatrooms.forEach(element => {
        if (!(element.name in rooms)) {
          rooms[element.name] = { users: {} };
        }
      });
      res.render("index", { rooms: chatrooms, message: "", username: req.session.UNAME });
    });
  });

  //signup

  // entering a chatroom
  //app.get('/:room/:rid (req, res) => {
  app.get('/rooms', (req, res) => {

      db.Chatroom.findOne({ where : { id : req.query.room }}).then(function(room) {
        //db.Comments.findAll where chatroomId: name.id
        db.Comments.findAll({
          include: [{ model: db.Users }],
          where: {
            ChatroomId: room.id
          }
        }).then(function(rows) {
            res.render('room', { user: req.session.UNAME, comments: rows, roomName: room.name, roomId: req.query.room });
        });
      });

    // else enter chatroom
  });

  // post method running the room-created function (see script.js)
  app.post('/room', (req, res) => {
  // Lets user know if the room has already been created
    if (rooms[req.body.room] != null) {
        return res.redirect('/');
    };
    rooms[req.body.room] = { users: {} };
    res.redirect(req.body.room);
    // Send message that new room was created using the room-created function
    io.emit('room-created', req.body.room)
  });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};