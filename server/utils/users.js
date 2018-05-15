
// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} years old.`;
// 	}
// }

// var me = new Person('Jacob', 28);
// var description = me.getUserDescription();
// console.log(description);


class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
}



module.exports = {Users};