// FUNCTION TO TEST IF STRING IS REAL
var isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0;
};

// EXPORT STRING TEST FUNCTION
module.exports = {isRealString};