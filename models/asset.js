// file that creates a 'asset' model for the 'mongoose' plugin

var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
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
		serialNumber: {
			type: String,
		},
		curentlyRended: {
			type: Boolean,
		},
		rentedBy: {
			type: Array,
		}
	},
);

const Asset = mongoose.model('Asset', userSchema);

// export default User;
module.exports.Asset = Asset;
