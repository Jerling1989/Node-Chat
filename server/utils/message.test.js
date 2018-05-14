// REQUIRE FUNCTIONS AND PACKAGES
var expect = require('expect');
var {generateMessage} = require('./message');

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