const multer = require('multer'),
	path = require('path'),
	rootDir = path.dirname(process.env.mainModule.filename),
	generateCryptoId = require('../helpers/randomIds').generateCryptoId;

// cb is a callback that takes an error message and the result based on the function
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		// where to temperoraly put the file ?
		cb(null, `${rootDir}/images`);
	},
	filename: async (req, file, cb) => {
		// name the file to be unique
		const id = await generateCryptoId(12);
		cb(null, `${id}-${file.originalname}`);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb('File type is not supported.', false); // false >> refuse
	}
};

module.exports = multer({ storage: fileStorage, fileFilter: fileFilter });
