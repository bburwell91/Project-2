var db = require("../models");

module.exports = function(app) {

  rooms = {};

  // Load index page
  app.get("/", function(req, res) {
    db.Chatroom.findAll().then(function(chatrooms){
      chatrooms.forEach(element => {
        if (!(element.name in rooms)) {
          rooms[element.name] = { users: {} };
          // console.log(element.name);
        }
      });
      console.log(req.session.UID);
      res.render("index", { rooms: chatrooms, message: "" });
    });
  });

  // entering a chatroom
  //app.get('/:room/:rid', (req, res) => {
  app.get('/:room', (req, res) => {

    // if not a chatroom, redirect to index
    if (rooms[req.params.room] == null) {
        // return res.redirect('/');
    };

    db.Chatroom.findOne({ where : { id : req.params.room }}).then(function(room) {
      //db.Comments.findAll where chatroomId: name.id
      //foreach loop to display line  of the chat
      res.render('room', { roomName: room.name, roomId: req.params.room });
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