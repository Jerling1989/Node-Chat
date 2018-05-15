// REQUIRE FUNCTIONS AND PACKAGES
const expect = require('expect');
const {isRealString} = require('./validation');

// TEST ISREALSTRING FUNCTION
describe('isRealString', () => {
	// REJECT NON STRING VALUES
	it('should reject non-string values', () => {
		var testString = 1234;
		var res = isRealString(testString);

		expect(res).toBe(false);
	});
	// REJECT EMPTY STRING (JUST SPACES)
	it('should reject string with only spaces', () => {
		var testString = '    ';
		var res = isRealString(testString);

		expect(res).toBe(false);
	});
	// ALLOW ANY STRING WITH REGUALR CHARACTERS
	it('should allow string with non-space characters', () => {
		var testString = '  Node Champions ';
		var res = isRealString(testString);

		expect(res).toBe(true);
	});

});