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
	// CREATE LIST VARIABLE
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	// APPEND MESSAGE LIST ITEM TO INDEX.HTML 
	jQuery('#messages').append(li);
});

// NEW LOCATION MESSAGE EVENT LISTENER
socket.on('newLocationMessage', function (message) {
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);

	// APPEND LOCATION MESSAGE TO INDEX.HTML 
	jQuery('#messages').append(li);
});


// EVENT LISTENER FOR MESSAGE FORM SUBMISSION
jQuery('#message-form').on('submit', function (e) {
	// PREVENT FORM SUBMIT DEFAULT
	e.preventDefault();
	// EMIT NEW MESSAGE TO SERVER
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {
	});
});

// STORE SEND LOCATION BUTTON IN VARIABLE
var locationButton = jQuery('#send-location');
// CREATE CLICK EVENT FOR SEND LOCATION BUTTON
locationButton.on('click', function () {
	// IF GEOLOCATION IS NOT SUPPORTED BY BROWSER ALERT USER
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}
	// CREATE NEW LOCATION MESSAGE WITH LAT & LONG
	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		// ALERT USER UNABLE TO GET LOCATION IF THEY DENY TO SHARE
	}, function () {
		alert('Unable to fetch location.');
	});
});
















