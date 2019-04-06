var mongoose = require('mongoose');

var newPersonalCanvas = mongoose.Schema({
	userId: Number,
	nameOfDesign: String,
	modelColour: String,
	image: String,
	personalText: String,
	textColour: String,
	fontSize: String
});

module.exports = mongoose.model('personalCanvas', newPersonalCanvas);
