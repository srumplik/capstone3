var mongoose = require('mongoose');  // require the 'mongoose' plugin
var userModel = require('./models/user');  // require the 'user' model file
const initialUsers = [{username: 'admin', password: 'password', userFirstName: 'John', userLastName: 'Doe'}, {username: 'agathye', password: 'PASSword1', userFirstName: 'Anthony', userLastName: 'Gathye'}, {username: 'Testuser', password: 'password2', userFirstName: 'Jane', userLastName: 'Smith'}];  // predefined users for seeding the database
const initialClients = []
const initialAssets = []

const cleanDB = () => {
	console.log('clearing users');
	userModel.User.deleteMany({}).then(function(){
		console.log('Users initialized');
	}).catch(function(error){
		console.log(error);
	});
};

const seedDB = () => {
	console.log('seeding database');
	const initialNames = userModel.User;
	const doc = initialNames.create(initialUsers);
	console.log('Users added');
	console.log('database seeded');
};

exports.cleanDB = cleanDB;  //exports the 'cleanDB' function
exports.seedDB = seedDB;  // exports the 'seedDB' function
