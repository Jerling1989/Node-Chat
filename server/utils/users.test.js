// REQUIRE FUNCTIONS AND PACKAGES
const expect = require('expect');
const {Users} = require('./users');

// TEST FOR THE USER CLASS
describe('Users', () => {
	// CREATE SEED DATA FOR TESTS
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'Jen',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Frank',
			room: 'Node Course'
		}];
	});

	// SHOULD ADD A NEW USER
	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Jacob',
			room: "Game of Thrones"
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	// SHOULD REMOVE A USER FROM USER ARRAY
	it('should remove a user', () => {
		var userId = '1';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	// SHOULD NOT REMOVE A USER FROM USER ARRAY
	it('should not remove user', () => {
		var userId = '99';
		var user = users.removeUser(userId);

		expect(user).toBeFalsy();
		expect(users.users.length).toBe(3);
	});

	// SHOULD FIND A USER
	it('should find user', () => {
		var userId = '2';
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	// SHOULD NOT FIND A USER
	it('should not find user', () => {
		var userId = '99';
		var user = users.getUser(userId);

		expect(user).toBeFalsy();
	});

	// SHOULD RETURN USER(S) IN A SPECIFIC SOCKET ROOM
	it('should return names for Node Course room', () => {
		var userList = users.getUserList('Node Course');

		expect(userList).toEqual(['Mike', 'Frank']);
	});

	// SHOULD RETURN USER(S) IN A SPECIFIC SOCKET ROOM
	it('should return names for React Course room', () => {
		var userList = users.getUserList('React Course');

		expect(userList).toEqual(['Jen']);
	});

});