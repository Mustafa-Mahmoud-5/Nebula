const jwt = require('jsonwebtoken'),
	sendError = require('../helpers/sendError');

const isAuth = (req, res, next) => {
	// this function is based on jwt

	try {
		const secret = process.env.TOKEN_SECRET;

		const authHeader = req.get('Authorization');

		if (!authHeader) sendError('User is not authenticated', 401);

		const token = authHeader.split(' ')[1]; // get the second word after space

		if (!token) sendError('Token is not passed', 401);

		const decodedToken = jwt.decode(tojen, secret);

		if (!decodedToken) sendError('Token is fake', 401);

		if (Date.now() > decodedToken.exp * 1000) sendError('Token is expired', 401);

		req.userId = decodedToken.userId;

		next();
	} catch (error) {
		// this function is sync, then in order to throw the catched error to the express error handler, we have to throw it from here

		error.statusCode = error.statusCode || 500;

		throw error;
	}
};

module.exports = isAuth;
