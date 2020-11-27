// Name:      CSIS483 Capstone Project - Asset Tracking
// Purpose:   Web Application for Asset Tracking
// Student:    Anthony Gathye

// file that creates a 'user' model for the 'mongoose' plugin

var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		userFirstName: {
			type: String,
			required: true,
		},
		userLastName: {
			type: String,
			required: true,
		},
	},
);

const User = mongoose.model('User', userSchema);

// export default User;
module.exports.User = User;
