// file that creates a 'customer' model for the 'mongoose' plugin

var mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
	{
		orgName: {
			type: String,
			unique: true,
			required: true,
		},
		orgContactPhoneNumber: {
			type: String,
			unique: true,
			required: true,
		},
		orgContactFirstName: {
			type: String,
			required: true,
		},
		orgContactLastName: {
			type: String,
			required: true,
		},
		orgContactStreetAddress: {
			type: String,
			required: true,
		},
		orgContactCity: {
			type: String,
			required: true,
		},
		orgContactState: {
			type: String,
			required: true,
		},
		orgContactZip: {
			type: String,
			required: true,
		},
	},
);

const Client = mongoose.model('Client', clientSchema);

// export default User;
module.exports.Client = Client;
