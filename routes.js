// Name:      CSIS483 Capstone Project - Asset Tracking
// Purpose:   Web Application for Asset Tracking
// Student:    Anthony Gathye

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// APPLICATION LANDING PAGE
router.get('/', function(req,res){ // Server responds to HTTP GET request @ '/' URI with a callback function which takes in two perameters 'req' (request) & 'res' (response).
	res.render('index');  // The response to the request
});


// lOGIC FOR LOGIN PAGE ========================================================
router.post('/login',function ( req, res ){
	if (req.body.username == '' || req.body.password == ''){  //  check to see that both boxes have values
		res.send('Please enter username and password');  // if either box is empty, return error message
	}
	else {  // if boxes are complete, check DB for username & password
		mongoose.model('User').findOne({'username':req.body.username},function(err,user){  //  function to search database
			if (err) return handleError (err)  // if error, return error
			else if (user == null) {  //  if username not in database, return error
				res.send('Username not in database');
			}
			else if (user.username == req.body.username && user.password == req.body.password){  //  if username and password are in database, redirect to page for user
				res.redirect('/user/all');
			}
			else {  //  return other errors
				res.send('Incorrect password');
			};
		});
	};
});


// ROUTES FOR USERS ============================================================
router.get('/user/all', function ( req, res) {  // display ALL users
	mongoose.model('User').find({}, function(err,users){  // function to return all documents in the 'Users' collection
		res.render('./user/users', {  // renders the 'users.pug' file
			users: users  // sends the JSON data returned from the DB to the 'users.pug' file for rendering
		});
	});
});

router.get('/user/one/:id', function ( req, res ) {  //  display ONE user via its _id
	mongoose.model('User').findOne({'_id': req.params.id}, function(err,user){  // function to return one document in the 'Users' colleciton with the '_id' passed in through the URL request
		if(user == null)  // if the supplied '_id' is not in the 'Users' collection, return an 'error'
		{
			res.send('No user in database with that ID');  // sending the 'error'
		}else  // render the 'user.pug' file while passing the JSON data through
		{
			res.render('./user/user', {
				user: user.username,
				user_id: user._id,
				userPassword: user.password,
				userFirstName: user.userFirstName,
				userLastName: user.userLastName
			});
		};
	});
});

router.get('/user/create', function ( req, res) {  // page with form for creating a new user
	res.render('./user/createUser');  // render the 'createUser.pug' file
});

router.post('/user/create', function ( req, res ) {  // add new user to DB
	mongoose.model('User').create({username: req.body.username, password: req.body.password, userFirstName: req.body.userFirstName, userLastName: req.body.userLastName}, function(err, result) {  // function to save a new user document to the 'Users' collection
		if (err){
			console.log(req.body);
			res.send(err);
		} else {
			res.redirect('/user/all');
		};
	});
});

router.post('/user/update/:id', function ( req, res ) {  // update user in DB via its _id
	mongoose.model('User').findOneAndUpdate({ '_id': req.params.id}, req.body, function(err, user){  // function to find a user document that matches the '_id' passed in and update the document values with the newly supplied values
		if(err){
			console.log(err);
		}else
		{
			//console.log(user);
		};
	});
	res.redirect('/user/all');  // once completed, redirect to show all users and including the newly updated user
});

router.get('/user/delete/:id', function ( req, res ) {  // delete user from DB via its _id
	mongoose.model('User').deleteOne({ '_id': req.params.id}, function(err, result){ // function to find user document based on '_id' and remove it from 'Users' collection
		if(err){
			res.status(500).send(err);
		}else
		{
			res.redirect('/user/all');  // redirect to show all users
		};
	});
});



// ROUTES FOR CLIENTS =======================================
router.get('/client/all', function( req, res ){
	mongoose.model('Client').find({}, function(err,clients){  // function to return all documents in the 'Clients' collection
		res.render('./client/clients', {  // renders the 'clients.pug' file
			clients: clients  // sends the JSON data returned from the DB to the 'clients.pug' file for rendering
		});
	});
}),

router.get('/client/one/:id', function ( req, res ) {  //  display ONE client via its _id
	mongoose.model('Client').findOne({'_id': req.params.id}, function(err,client){  // function to return one document in the 'Client' colleciton with the '_id' passed in through the URL request
		if(client == null)  // if the supplied '_id' is not in the 'Client' collection, return an 'error'
		{
			res.send('No client in database with that ID');  // sending the 'error'
		}else  // render the 'client.pug' file while passing the JSON data through
		{
			res.render('./client/client', {
				clientID: client._id,
				client: client.orgName,
				contactFirstName: client.orgContactFirstName,
				contactLastName: client.orgContactLastName,
				contactPhoneNumber: client.orgContactPhoneNumber,
				contactStreetAddress: client.orgContactStreetAddress,
				contactCity: client.orgContactCity,
				contactState: client.orgContactState,
				contactZip: client.orgContactZip
			});
		}
	});
});

router.get('/client/create', function ( req, res) {  // page with form for creating a new client
	res.render('./client/createClient');  // render the 'createClient.pug' file
});

router.post('/client/create', function ( req, res ) {  // add new client to DB
	mongoose.model('Client').create({orgName: req.body.orgName, orgContactFirstName: req.body.orgContactFirstName, orgContactLastName: req.body.orgContactLastName, orgContactPhoneNumber: req.body.orgContactPhoneNumber, orgContactStreetAddress: req.body.orgStreetAddress, orgContactCity: req.body.orgCity, orgContactState: req.body.orgState, orgContactZip: req.body.orgZip}, function(err, result) {  // function to save a new client document to the 'Client' collection
		if (err){
			console.log(req.body);
			res.send(err);
		} else {
			res.redirect('/client/all');
		};
	});
});

router.post('/client/update/:id', function ( req, res ) {  // update client in DB via its _id
	mongoose.model('Client').findOneAndUpdate({ '_id': req.params.id}, req.body, function(err, client){  // function to find a client document that matches the '_id' passed in and update the document values with the newly supplied values
		if(err){
			console.log(err);
		}else
		{
			//console.log(client);
		};
	});
	res.redirect('/client/all');  // once completed, redirect to show all clients and including the newly updated client
});

router.get('/client/delete/:id', function ( req, res ) {  // delete client from DB via its _id
	mongoose.model('Client').deleteOne({ '_id': req.params.id}, function(err, result){ // function to find client document based on '_id' and remove it from 'Clients' collection
		if(err){
			res.status(500).send(err);
		}else
		{
			res.redirect('/client/all');  // redirect to show all clients
		};
	});
});


// ROUTES FOR ASSETS =======================================
router.get('/asset/all', function( req, res ){
	mongoose.model('Asset').find({}, function(err,assets){  // function to return all documents in the 'Assets' collection
		res.render('./asset/assets', {  // renders the 'assets.pug' file
			assets: assets  // sends the JSON data returned from the DB to the 'assets.pug' file for rendering
		});
	});
}),

router.get('/asset/one/:id', function ( req, res ) {  //  display ONE asset via its _id
	mongoose.model('Asset').findOne({'_id': req.params.id}, function(err,asset){  // function to return one document in the 'Asset' colleciton with the '_id' passed in through the URL request
		if(asset == null)  // if the supplied '_id' is not in the 'Asset' collection, return an 'error'
		{
			res.send('No Asset in database with that ID');  // sending the 'error'
		}else  // render the 'Asset.pug' file while passing the JSON data through
		{
			res.render('./asset/asset', {
				dbID: asset._id,
				assetID: asset.assetID,
				make: asset.make,
				model: asset.model,
				department: asset.department,
				serialNumber: asset.serialNumber,
				currentlyRented: asset.currentlyRented,
				initialCost: asset.initialCost,
				rentalPrice: asset.rentalPrice,
				timesRented: asset.timesRented,
				rentedBy: asset.rentedBy
			});
		}
	});
});

router.get('/asset/create', function ( req, res) {  // page with form for creating a new asset
	res.render('./asset/createAsset');  // render the 'createAsset.pug' file
});

router.post('/asset/create', function ( req, res ) {  // add new asset to DB
	if(req.body.currentlyRented == 'on'){  // if 'currentlyRented' checkbox is clicked, show 'true' in DB
		mongoose.model('Asset').create({assetID: req.body.assetID, make: req.body.make, model: req.body.model, department: req.body.department, serialNumber: req.body.serialNumber, currentlyRented: true, initialCost: req.body.initialCost, rentalPrice: req.body.rentalPrice, timesRented: req.body.timesRented, rentedBy: req.body.rentedBy}, function(err, result) {  // function to save a new asset document to the 'Asset' collection
			if (err){
				console.log(req.body);
				res.send(err);
			} else {
				res.redirect('/asset/all');
			};
		});
	}else{
		mongoose.model('Asset').create({assetID: req.body.assetID, make: req.body.make, model: req.body.model, department: req.body.department, serialNumber: req.body.serialNumber, currentlyRented: false, initialCost: req.body.initialCost, rentalPrice: req.body.rentalPrice, timesRented: req.body.timesRented, rentedBy: req.body.rentedBy}, function(err, result) {  // function to save a new asset document to the 'Asset' collection
			if (err){
				console.log(req.body);
				res.send(err);
			} else {
				res.redirect('/asset/all');
			};
		});
	}
});

router.post('/asset/update/:id', function ( req, res ) {  // update asset in DB via its _id
	mongoose.model('Asset').findOneAndUpdate({ '_id': req.params.id}, req.body, function(err, asset){  // function to find a user document that matches the '_id' passed in and update the document values with the newly supplied values
		if(err){
			console.log(err);
		}else
		{
			//console.log(asset);
		};
	});
	res.redirect('/asset/all');  // once completed, redirect to show all asset and including the newly updated asset
});

router.get('/asset/delete/:id', function ( req, res ) {  // delete asset from DB via its _id
	mongoose.model('Asset').deleteOne({ '_id': req.params.id}, function(err, result){ // function to find asset document based on '_id' and remove it from 'Asset' collection
		if(err){
			res.status(500).send(err);
		}else
		{
			res.redirect('/asset/all');  // redirect to show all asset
		};
	});
});


module.exports = router
