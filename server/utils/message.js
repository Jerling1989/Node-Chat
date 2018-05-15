// REQUIRE MOMENT
var moment = require('moment');

// GENERATE MESSAGE FUNCTION
var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().valueOf()
	}
};

// GENERATE LOCATION MESSAGE FUNCTION
var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	};
};

// EXPORT FUNCTION
module.exports = {generateMessage, generateLocationMessage};