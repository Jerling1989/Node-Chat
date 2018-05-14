// GENERATE MESSAGE FUNCTION
var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	}
};

// EXPORT FUNCTION
module.exports = {generateMessage};