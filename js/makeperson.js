(function makePerson(name, age) {

	var kids = [];
	var person = {

	// Return an object that has the following methods...

	// a method get return kids
	getKids : function() {
		return kids;
		},
	// a method to have a new kid
	haveAKid : function(kidName) {
		kids.push(kidName);
		return kids;
		},
	// a method to get the person's name
	getName : function() {
		return name;
		},

	// a method to get the person's age
	getAge : function() {
		return age;
		},
	// a method to celebrate the person's birthday
	celebrateBirthday : function() {
		age++;
		return age;
		}


	}


})('bob',23)


// console.log(bob.getKids());
// console.log(bob.haveAKid('bobby'));
// console.log(bob.getName());
// console.log(bob.getAge());
// console.log(bob.celebrateBirthday());
// console.log(bob.getKids());




