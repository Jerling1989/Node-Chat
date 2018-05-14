// REQUIRE FUNCTIONS AND PACKAGES
var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

// TEST GENERATE MESSAGE FUNCTION
describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var testName = 'John';
		var testText = 'This is a test';
		var message = generateMessage(testName, testText);

		expect(message.from).toBe(testName);
		expect(message.text).toBe(testText);
		expect(typeof message.createdAt).toBe('number');
		
	});
});

// TEST GENERATE LOCATION MESSAGE FUNCTION
describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var testName = 'John';
		var testLat = 35.7854206;
		var testLong = -85.843653;
		var location = generateLocationMessage(testName, testLat, testLong);

		expect(location.from).toBe(testName);
		expect(typeof location.createdAt).toBe('number');
		expect(location.url).toBe(`https://www.google.com/maps?q=${testLat},${testLong}`);
	});
});