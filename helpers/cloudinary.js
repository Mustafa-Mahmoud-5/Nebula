const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

function uploadImage(file, folder) {
	// file is the image url in the images folder

	// folder is the folder name in your cloudinary assets that you want to upload this photo in

	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			file,
			{
				folder: folder,
				type: 'upload'
			},
			(error, result) => {
				if (error) reject('File have not been uploaded');

				resolve(result);

				// the returned result is an object
			}
		);
	});
}

function removeImage(publicId) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(`FolderNameInCloudinary/${publicId}`, {}, (error, result) => {
			if (error) reject('File have not been removed from cloudinary');

			resolve(result);
		});
	});
}

module.exports = {
	uploadImage,
	removeImage
};
