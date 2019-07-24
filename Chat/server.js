
// NOTES TO SELF AND GROUP:
// The following link will help you understand Socket.io commands and how things are working below: https://socket.io/docs/emit-cheatsheet/

const express = require('express');
const app = express();

// creates the http server
const server = require('http').Server(app);

// use socket.io on the server
const io = require('socket.io')(server);

// similar to handlebars, allows you to use ejs in the views folder
app.set('views', './views');
app.set('view engine', 'ejs');

// allow loading files in public folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const rooms = {};

// rooms object is displayed on the index page
app.get('/', (req, res) => {
    res.render('index', { rooms: rooms });
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
    }
    rooms[req.body.room] = { users: {} };
    res.redirect(req.body.room);
    // Send message that new room was created using the room-created function
    io.emit('room-created', req.body.room)
})

server.listen(3000);

// on connection, create a new socket for the new user
io.on('connection', socket => {
    socket.on('new-user', (room, name) => {
        socket.join(room);
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
}