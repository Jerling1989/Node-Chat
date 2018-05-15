// REQUIRE NODE & NPM PACKAGES
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// REQUIRE FUNCTIONS
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

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

// POINT SERVER TO FRONTEND PATH
app.use(express.static(publicPath));

// CLIENT CONNECTION EVENT LISTENER
io.on('connection', (socket) => {
	console.log('New user connected');

	// EVENT LISTENER FOR JOIN FORM SUBMISSION
	socket.on('join', (params, callback) => {
		// IF FORM IS NOT FILLED CORRECTLY SEND ERROR
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required.');
		} 

		// JOIN ROOM
		socket.join(params.room);
		// socket.leave(params.room);


		// EMIT WELCOME MESSAGE TO USER THAT JOINED
		socket.emit('newMessage', generateMessage('Admin', "Welcome to Node Chat"));
		// BROADCAST THAT NEW USER JOINED TO OTHER USERS
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));



		callback();
	});

	// EVENT LISTENER FOR CREATED MESSAGE
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		// EMIT MESSAGE FROM SERVER BACK TO CLIENT
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	// EVENT LISTENER FOR NEW LOCATION MESSAGE
	socket.on('createLocationMessage', (coords) => {
		// EMIT LOCATION MESSAGE FROM SERVER BACK TO CLIENT
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	// CLIENT DISCONNECTED EVENT LISTENER
	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

});

// DISPLAY PORT CONNECTION
server.listen(port, () => {
	console.log(`Running on port ${port}`);
});
