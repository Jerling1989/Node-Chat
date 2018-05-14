// CREATE SOCKET CONNECTION
var socket = io();
// SERVER CONENECTION EVENT LISTENER
socket.on('connect', function () {
	console.log('Connected to server');
});
// SERVER DISCONNECTED EVENT LISTENER
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

// NEW MESSAGE EVENT LISTENER
socket.on('newMessage', function (message) {
	console.log('newMessage', message);
});