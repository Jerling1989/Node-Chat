// CREATE SOCKET CONNECTION
var socket = io();

// FUNCTION TO CALCULATE AUTOSCROLL TO BOTTOM
function scrollToBottom () {
	// SELECTORS
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	// HEIGHTS
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	// IF THE USER IS CLOSE TO THE BOTTOM OF THE MESSAGE PANEL
	// AUTOMATICALLY SCROLL TO THE BOTTOM WHEN NEW MESSAGE IS RECEIVED
	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
};


// SERVER CONENECTION EVENT LISTENER
socket.on('connect', function () {
	// GET PARAMS FROM JOIN FORM SUBMISSION
	var params = jQuery.deparam(window.location.search);
	// EMIT NEW JOIN EVENT TO SERVER
	socket.emit('join', params, function (err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});

// SERVER DISCONNECTED EVENT LISTENER
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

// NEW MESSAGE EVENT LISTENER
socket.on('newMessage', function (message) {
	// CREATE MESSAGE TIMESTAMP
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	// USE TEMPLATE TO RENDER MESSAGE
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	// APPEND MESSAGE TO HTML
	jQuery('#messages').append(html);
	scrollToBottom();
});

// NEW LOCATION MESSAGE EVENT LISTENER
socket.on('newLocationMessage', function (message) {
	// CREATE MESSAGE TIMESTAMP
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	// USE TEMPLATE TO RENDER LOCATION MESSAGE
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});
	// APPEND LOCATION MESSAGE TO INDEX.HTML 
	jQuery('#messages').append(html);
	scrollToBottom();
});


// EVENT LISTENER FOR MESSAGE FORM SUBMISSION
jQuery('#message-form').on('submit', function (e) {
	// PREVENT FORM SUBMIT DEFAULT
	e.preventDefault();
	// CREATE VARIABLE FOR MESSAGE FORM INPUT
	var messageTextbox = jQuery('[name=message]');
	// EMIT NEW MESSAGE TO SERVER
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery(messageTextbox).val()
	}, function () {
		// CLEAR MESSAGE FORM INPUT
		jQuery(messageTextbox).val('');
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
	// DISABLE LOCATION BUTTON AFTER CLICK
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	// CREATE NEW LOCATION MESSAGE WITH LAT & LONG
	navigator.geolocation.getCurrentPosition(function (position) {
		// RE-ENABLE LOCATION BUTTON ONCE RESULTS COME IN
		locationButton.removeAttr('disabled').text('Send location');
		// EMIT LOCATION MESSAGE LAT & LONG TO SERVER
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		// ALERT USER UNABLE TO GET LOCATION IF THEY DENY TO SHARE
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});
















