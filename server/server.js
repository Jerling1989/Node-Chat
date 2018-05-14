// REQUIRE NODE & NPM PACKAGES
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

	// EMIT WELCOME MESSAGE TO USER THAT JOINED
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to Node Chat',
		createdAt: new Date().getTime()
	});

	// BROADCAST THAT NEW USER JOINED TO OTHER USERS
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined chat',
		createdAt: new Date().getTime()
	});

	// EVENT LISTENER FOR CREATED MESSAGE
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		// EMIT MESSAGE FROM SERVER BACK TO CLIENT
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
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
