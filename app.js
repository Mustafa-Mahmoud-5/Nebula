const fs = require('fs'),
	path = require('path'),
	express = require('express'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	helmet = require('helmet'),
	bodyParser = require('body-parser'),
	multerMiddleWare = require('./middlewares/multerUploader');

const app = express();

// CORS POLICY
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

	res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

	next();
});

// Global Middlewares
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));

app.use(morgan('combined', { stream: accessLogStream }));
app.use(helmet());
app.use(multerMiddleWare.single('image'));

// file uploader middleware
app.use(bodyParser.json());

// Apis.. write down all the routes imports here

// app.use('/auth', authRoutes);
// app.use('/auth', authRoutes);
// app.use('/auth', authRoutes);
// app.use('/auth', authRoutes);

// Error Handler
app.use((error, req, res, next) => {
	console.log('error.message', error.message);
	console.log('error.statusCode', error.statusCode);

	res.status(error.statusCode || 500).json(error.message || `Something Went Wrong: ${error.toString()}`);
});

// DB Configs
const mongoURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.71gmc.mongodb.net/${process.env
		.DB_NAME}?retryWrites=true&w=majority`,
	mongoConfigs = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	},
	port = 2500;

// DB connection
mongoose
	.connect(mongoURL, mongoConfigs)
	.then(() => {
		console.log('Connected..');

		const httpServer = app.listen(process.env.PORT || port); // take the httpServer if  websockets is in the plan
	})
	.catch(err => {
		console.log('Failed To Connect..', err);
	});
