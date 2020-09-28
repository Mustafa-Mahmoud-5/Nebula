const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	sendError = require('../helpers/sendError');

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			lowercase: true
		},
		lastName: {
			type: String,
			required: true,
			lowercase: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		image: {
			type: String,
			default: null
		},
		passwordRecoveryToken: {
			type: Schema.Types.Mixed,
			defualt: null
		}
	},
	{ timestamps: true }
);

class UserClass {
	static publicProps() {
		return [ 'firstName', 'lastName', 'image' ];
	}
}

userSchema.loadClass(UserClass);

const User = mongoose.model('User', userSchema);

module.exports = User;
