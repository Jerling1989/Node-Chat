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

	// CLIENT DISCONNECTED EVENT LISTENER
	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

});

// DISPLAY PORT CONNECTION
server.listen(port, () => {
	console.log(`Running on port ${port}`);
});
