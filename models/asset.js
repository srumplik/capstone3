// file that creates a 'asset' model for the 'mongoose' plugin

var mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
	{
		assetID: {
			type: String,
			unique: true,
			required: true,
		},
		make: {
			type: String,
		},
		model: {
			type: String,
		},
		department: {
			type: String,
		},
		serialNumber: {
			type: String,
		},
		curentlyRended: {
			type: Boolean,
		},
		rentedBy: {
			type: Array,
		},
		initialCost: {
			type: Number,
		},
		rentalPrice: {
			type: Number,
		},
		timesRented: {
			type: Number,
		},
	},
);

const Asset = mongoose.model('Asset', assetSchema);

// export default User;
module.exports.Asset = Asset;
