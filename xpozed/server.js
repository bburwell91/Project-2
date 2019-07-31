require("dotenv").config();
var express = require("express");
var session = require("express-session");
// var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").createServer(app);
global.io = require("socket.io")(http);
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'catdog',
  resave: false,
  saveUninitialized: true
}));
 
app.use(function (req, res, next) {
 
  next()
});

// similar to handlebars, allows you to use ejs in the views folder
app.set("views", "./views");
app.set("view engine", "ejs");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};



// on connection, create a new socket for the new user
io.on('connection', socket => {

  socket.on('new-user', (room, name) => {
      socket.join(room);
      console.log('room', room)
      rooms[room] = room
      rooms[room].users[socket.id] = name;

      socket.to(room).broadcast.emit('user-connected', name);
  });
  socket.on('send-chat-message', (room, message) => {
      socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
  });
  socket.on('disconnect', () => {
      getUserRooms(socket).forEach(room => {
          socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
          delete rooms[room].users[socket.id];
      })
  });
});

// to find out which rooms a user is in, only allowing a user to be in one room at a time
function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
      if (room.users[socket.id] != null) names.push(name);
      return names;
  }, []);
};

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  http.listen(PORT, function() {
    console.log(
      "Listening on port %s. http://localhost:%s/",
      PORT,
      PORT
    );
  });
});

module.exports = app;
