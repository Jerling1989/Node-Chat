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

	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

// EVENT LISTENER FOR MESSAGE FORM SUBMISSION
jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {

	});
});