// REQUIRE NODE & NPM PACKAGES
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// REQUIRE FUNCTIONS
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// CREATE PUBLIC PATH VARIABLE
const publicPath = path.join(__dirname, '../public');
// CREATE PORT VARIABLE
const port = process.env.PORT || 3000;
// CREATE APP EXPRESS VARIABLE
var app = express();
// CREATE HTTP SERVER
var server = http.createServer(app);
// CREATE WEB SOCKETS SERVER
var io = socketIO(server);
// CREATE USERS INSTANCE
var users = new Users();

// POINT SERVER TO FRONTEND PATH
app.use(express.static(publicPath));

// CLIENT CONNECTION EVENT LISTENER
io.on('connection', (socket) => {
	console.log('New user connected');

	// EVENT LISTENER FOR JOIN FORM SUBMISSION
	socket.on('join', (params, callback) => {
		// IF FORM IS NOT FILLED CORRECTLY SEND ERROR
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		} 

		// JOIN ROOM
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		// EMIT LIST OF USERS TO CLIENT
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));


		// EMIT WELCOME MESSAGE TO USER THAT JOINED
		socket.emit('newMessage', generateMessage('NodeBot', "Welcome to Node Chat"));
		// BROADCAST THAT NEW USER JOINED TO OTHER USERS
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('NodeBot', `${params.name} has joined the chat.`));



		callback();
	});

	// EVENT LISTENER FOR CREATED MESSAGE
	socket.on('createMessage', (message, callback) => {
		// CREATE VARIABLE FOR USER
		var user = users.getUser(socket.id);
		// IF USER EXISTS AND MESSAGE IS STRING
		if (user && isRealString(message.text)) {
			// EMIT MESSAGE FROM SERVER BACK TO CLIENT
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});

	// EVENT LISTENER FOR NEW LOCATION MESSAGE
	socket.on('createLocationMessage', (coords) => {
		// CREATE VARIABLE FOR USER
		var user = users.getUser(socket.id);
		// IF USER EXISTS
		if (user) {
			// EMIT LOCATION MESSAGE FROM SERVER BACK TO CLIENT
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	// CLIENT DISCONNECTED EVENT LISTENER
	socket.on('disconnect', () => {
		// REMOVE USER FROM LIST
		var user = users.removeUser(socket.id);

		if (user) {
			// UPDATE LIST WITHOUT USER
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('NodeBot', `${user.name} has left the chat.`));
		}
	});

});

// DISPLAY PORT CONNECTION
server.listen(port, () => {
	console.log(`Running on port ${port}`);
});
