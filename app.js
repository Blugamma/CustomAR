const express = require('express');
const app = express();
const multer = require('multer');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var device = require('express-device');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sess;
const https = require('https');
const fs = require('fs');
const port = 8080;
var presetLink =
	'https://api.mlab.com/api/1/databases/personalisar/collections/personalcanvas?apiKey=QcMYUxzSPh1UFvwhGMNJHciyVqHemZmC';
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(
	bodyParser.json({
		type: 'application/*+json'
	})
);
app.set('view engine', 'pug');
app.use(device.capture());
app.use(
	express.static('public', {
		index: false
	})
);
app.use(express.static('uploads'));
// parse application/x-www-form-urlencoded
app.use(
	session({
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: null
		},
		secret: 'eeuqram'
	})
);
// parse application/json
app.use(cookieParser());

var User = require('./public/js/models/user');
var personalCanvas = require('./public/js/models/personalCanvas');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});
const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 8 * 1024 * 1024,
		fieldNameSize: 8 * 1024 * 1024
	}
});

mongoose.connect('mongodb://testUser:password123@ds123012.mlab.com:23012/personalisar', function(err) {
	if (err) throw err;
	console.log('Successfully connected');
});

app.get('/', function(req, res) {
	sess = req.session;
	if (sess.email) {
		res.render('index', {
			message: 'Hello ' + sess.name
		});
	} else {
		res.render('index');
	}
});

app.get('/logout', function(req, res) {
	sess = req.session;
	sess.destroy();
	res.clearCookie('loginState');
	res.redirect('/');
});

app.get('/personalisation', function(req, res, err) {
	sess = req.session;
	var deviceType = req.device.type;
	var modelId = req.query.model;
	var nameOfDesignArray = [];
	if (sess.email) {
		personalCanvas.find(
			{
				userId: sess.userid
			},
			function(err, result) {
				if (err) console.log(err);
				if (result) {
					nameOfDesignArray.push('--Select--');
					for (var i = 0; i < result.length; i++) {
						nameOfDesignArray.push(result[i].nameOfDesign);
					}
					if (deviceType == 'desktop') {
						if (modelId == 'mug') {
							res.render('personalisation-marker', {
								model: '#mug-obj',
								scale: '0.02 0.02 0.02',
								rotation: '0 260 0',
								modelName: 'Mug Colour:',
								presets: nameOfDesignArray,
								presetLink: presetLink
							});
						}
						if (modelId == 'cushion') {
							res.render('personalisation-marker', {
								model: '#cushion-obj',
								scale: '0.05 0.05 0.05',
								rotation: '-90 0 0',
								modelName: 'Cushion Colour:',
								presets: nameOfDesignArray,
								presetLink: presetLink
							});
						}
					}
				} else if (deviceType == 'phone') {
					if (modelId == 'mug') {
						res.render('personalisation-markerless', {
							model: '#mug-obj',
							scale: '0.07 0.07 0.07',
							rotation: '0 260 0',
							modelName: 'Mug Colour:',
							presets: nameOfDesignArray,
							presetLink: presetLink
						});
					}
					if (modelId == 'cushion') {
						res.render('personalisation-markerless', {
							model: '#cushion-obj',
							scale: '0.1 0.1 0.1',
							rotation: '-90 0 0',
							modelName: 'Cushion Colour:',
							presets: nameOfDesignArray,
							presetLink: presetLink
						});
					}
				} else {
					console.log('No Data found!');
				}
			}
		);
	} else {
		if (deviceType == 'desktop') {
			if (modelId == 'mug') {
				res.render('personalisation-marker', {
					model: '#mug-obj',
					scale: '0.02 0.02 0.02',
					rotation: '0 260 0',
					modelName: 'Mug Colour:'
				});
			}
			if (modelId == 'cushion') {
				res.render('personalisation-marker', {
					model: '#cushion-obj',
					scale: '0.1 0.1 0.1',
					rotation: '-90 0 0',
					modelName: 'Cushion Colour:'
				});
			}
		} else if (deviceType == 'phone') {
			if (modelId == 'mug') {
				res.render('personalisation-markerless', {
					model: '#mug-obj',
					scale: '0.07 0.07 0.07',
					rotation: '0 260 0',
					modelName: 'Mug Colour:'
				});
			}
			if (modelId == 'cushion') {
				res.render('personalisation-markerless', {
					model: '#cushion-obj',
					scale: '0.1 0.1 0.1',
					rotation: '-90 0 0',
					modelName: 'Cushion Colour:'
				});
			}
		}
	}
});

app.post('/personaliseForm', upload.single('image'), function(req, res, err) {
	if (err) console.log(err);
	sess = req.session;
	console.log(req.body);
	var userID = sess.userid;
	var newpersonalCanvasData = new personalCanvas({
		userId: userID,
		nameOfDesign: req.body.nameOfDesign,
		modelColour: req.body.modelColour,
		image: 'uploads/' + req.file.filename,
		personalText: req.body.personalText,
		textColour: req.body.textColour,
		fontSize: req.body.fontSize
	});
	newpersonalCanvasData.save(function(error, record) {
		if (error) console.log(error);
		console.log(record + ' Successfully Uploaded!');
	});
});

app.post('/register', function(req, res, err) {
	if (err) console.log(err);
	var newUserData = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	console.log(req.body);
	User.findOne(
		{
			email: req.body.email
		},
		function(err, obj) {
			if (err) console.log(err);
			if (obj) {
				console.log('email already exists!');
				res.cookie('emailRegError', 'true', {
					maxAge: 900000
				});
				res.redirect('/');
			} else {
				newUserData.save(function(error, record) {
					if (error) console.log(error);
					console.log(record + ' Successfully Uploaded!');
				});
				res.clearCookie('emailRegError');
				res.redirect('/');
			}
		}
	);
});

app.post('/login', function(req, res, err) {
	if (err) console.log(err);
	User.findOne(
		{
			email: req.body.email
		},
		function(err, obj) {
			if (err) console.log(err);
			console.log(obj);
			if (!obj) {
				console.log("Your account doesn't exist");
				res.cookie('emailError', 'true', {
					maxAge: 900000
				});
				res.redirect('/');
			}

			if (obj) {
				const result = bcrypt.compareSync(req.body.password, obj.password);
				if (result) {
					sess = req.session;
					sess.userid = obj.id;
					sess.email = obj.email;
					sess.name = obj.name;
					//console.log(sess);
					console.log('password is correct!');
					res.cookie('loginState', 'true', {
						expires: 0
					});
					res.clearCookie('emailError');
					res.clearCookie('emailRegError');
					res.clearCookie('passwordError');
					res.clearCookie('usernameError');
					res.redirect('/');
				} else {
					res.cookie('passwordError', 'true', {
						maxAge: 900000
					});
					res.redirect('/');
				}
			}
		}
	);
});

/* app.post('/imageUpload', upload.single('image'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file.originalname);
}); */
app.listen(port, () => {
	console.log(`App is listening to ${port}`);
});
