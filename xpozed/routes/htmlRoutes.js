var db = require("../models");

module.exports = function(app) {

  rooms = {};

  // Load index page
  app.get("/", function(req, res) {
    res.render("index", { rooms: rooms });
  });

  // entering a chatroom
  app.get('/:room', (req, res) => {
    // if not a chatroom, redirect to index
    if (rooms[req.params.room] == null) {
        return res.redirect('/');
    };
    // else enter chatroom
    res.render('room', { roomName: req.params.room });
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