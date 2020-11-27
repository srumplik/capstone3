// Name:      CSIS483 Capstone Project - Asset Tracking
// Purpose:   Web Application for Asset Tracking
// Student:    Anthony Gathye


var mongoose = require('mongoose');  // require the 'mongoose' plugin
var userModel = require('./models/user');  // require the 'user' model file
var clientModel = require('./models/client')  // require the 'client' model file
var assetModel = require('./models/asset')  // require the 'asset' model file

const initialUsers = [
	{
		username: 'admin',
		password: 'password',
		userFirstName: 'John',
		userLastName: 'Doe'
	},
	{
		username: 'agathye',
		password: 'PASSword1',
		userFirstName: 'Anthony',
		userLastName: 'Gathye'
	},
	{
		username: 'Testuser',
		password: 'password2',
		userFirstName: 'Jane',
		userLastName: 'Smith'
	}
];  // predefined users for seeding the database
const initialClients = [
	{
		orgName: 'Acme LLC',
		orgContactFirstName: 'John',
		orgContactLastName: 'Smith',
		orgContactPhoneNumber: '407-555-1234',
		orgContactStreetAddress: '123 Main Street',
		orgContactCity: 'Orlando',
		orgContactState: 'FL',
		orgContactZip: '32822'
	},
	{
		orgName: 'Gathye Enterprises',
		orgContactFirstName: 'Anthony',
		orgContactLastName: 'Gathye',
		orgContactPhoneNumber: '407-555-9876',
		orgContactStreetAddress: '987 South Lake Ave',
		orgContactCity: 'Clermont',
		orgContactState: 'FL',
		orgContactZip: '34711'
	},
	{
		orgName: 'TTT Inc',
		orgContactFirstName: 'Teresa',
		orgContactLastName: 'Gathye',
		orgContactPhoneNumber: '407-555-6325',
		orgContactStreetAddress: '9032 Princess Way',
		orgContactCity: 'Clermont',
		orgContactState: 'FL',
		orgContactZip: '34711'
	},
	{
		orgName: 'Conferences R Us',
		orgContactFirstName: 'Jane',
		orgContactLastName: 'Doe',
		orgContactPhoneNumber: '800-555-4567',
		orgContactStreetAddress: '1000 Vegas Way',
		orgContactCity: 'Las Vegas',
		orgContactState: 'NV',
		orgContactZip: '88901'
	},
	{
		orgName: 'Concerts USA',
		orgContactFirstName: 'John',
		orgContactLastName: 'Mellencamp',
		orgContactPhoneNumber: '888-555-8520',
		orgContactStreetAddress: '123 Pink Houses Drive',
		orgContactCity: 'Seymour',
		orgContactState: 'IN',
		orgContactZip: '47274'
	}
]
const initialAssets = [
	{
		assetID: '01-12345',
		make: 'Panasonic',
		model: 'PT-RQ32K',
		department: 'Video',
		serialNumber: 'sd6gf54s654saf654a',
		curentlyRended: true,
		rentedBy: 'Gathye Enterprises',
		initialCost: 130000,
		rentalPrice: 15000,
		timesRented: 20
	},
	{
		assetID: '01-54321',
		make: 'Yamaha',
		model: 'QL5',
		department: 'Audio',
		serialNumber: 'sdg65gh5h3fdh313ysv',
		curentlyRended: true,
		rentedBy: 'Concerts USA',
		initialCost: 13000,
		rentalPrice: 400,
		timesRented: 12
	},
	{
		assetID: '01-98765',
		make: 'GrandMA',
		model: '3, Full size',
		department: 'Lighting',
		serialNumber: 'dfg654sdf61h651wet',
		curentlyRended: true,
		rentedBy: 'TTT Inc',
		initialCost: 80000,
		rentalPrice: 10000,
		timesRented: 7
	},
]

const cleanDB = () => {
	// clear users
	console.log('clearing users');
	userModel.User.deleteMany({}).then(function(){
		console.log('Users initialized');
	}).catch(function(error){
		console.log(error);
	});
	// clear clients
	console.log('clearing clients');
	clientModel.Client.deleteMany({}).then(function(){
		console.log('Clients initialized');
	}).catch(function(error){
		console.log(error);
	});
	// clear assets
	console.log('clearing assets');
	assetModel.Asset.deleteMany({}).then(function(){
		console.log('Assets initialized');
	}).catch(function(error){
		console.log(error);
	});
};

const seedDB = () => {
	console.log('seeding database');
	// seed users
	const initialNames = userModel.User;
	const userDoc = initialNames.create(initialUsers);
	console.log('Users added');
	// seed clients
	const initialClient = clientModel.Client;
	const clientDoc = initialClient.create(initialClients);
	console.log('Clients added');
	// seed assets
	const initialAsset = assetModel.Asset;
	const assetDoc = initialAsset.create(initialAssets);
	console.log('Assets added');
	console.log('database seeded');
};

exports.cleanDB = cleanDB;  //exports the 'cleanDB' function
exports.seedDB = seedDB;  // exports the 'seedDB' function
