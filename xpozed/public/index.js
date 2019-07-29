const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


// actions for the fields that can be submitted. first a prompt asking for your name, and then a listener for the submit button to send messages
if (messageForm != null) {
    const name = prompt('What is your name?');
    appendMessage('Welcome to the ' + roomName + ' chatroom!');
    socket.emit('new-user', roomName, name);

    messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageInput.value;
        appendMessage(`You: ${message}`);
        socket.emit('send-chat-message', roomName, message);
        messageInput.value = '';
    });
}

// function that creates a new chatroom
socket.on('room-created', room => {
    const roomElement = document.createElement('div');
    roomElement.innerText = room;
    const roomLink = document.createElement('a');
    roomLink.href = `/${room}`;
    roomLink.innerText = 'join';
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});

// function that displays a chat message
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

// function that displays when a user connects to the chat
socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

// function that displays when a user disconnects from the chat
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});

// function used to append the messages above into a div to be displayed on the page
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}