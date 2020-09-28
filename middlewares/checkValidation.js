const { validationResult } = require('express-validator'),
	sendError = require('../helpers/sendError');

module.exports = checkValidation = (req, res, next) => {
	const errors = validationResult(req); // get the validation result arr from req object

	if (!error.isEmpty()) {
		const errorMessage = errors.array()[0].msg;

		return sendError(errorMessage, 422);
	}

	next();
};
