// GENERATE MESSAGE FUNCTION
var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	}
};

// GENERATE LOCATION MESSAGE FUNCTION
var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: new Date().getTime()
	};
};

// EXPORT FUNCTION
module.exports = {generateMessage, generateLocationMessage};