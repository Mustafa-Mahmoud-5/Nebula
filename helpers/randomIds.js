const crypto = require('crypto');

const generateCryptoId = length => {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(length, (error, buffer) => {
			if (error) reject(error);

			const id = buffer.toString('hex');

			resolve(id);
		});
	});
};

const generateNumericId = length => {
	const code = '';

	for (let i = 1; i <= length; i++) {
		const randomDigit = Math.round(Math.random() * 9);

		code += randomDigit;
	}

	return Number(code);
};

module.exports = {
	generateCryptoId,
	generateNumericId
};
