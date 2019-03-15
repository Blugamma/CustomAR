const express = require('express');
const app = express();
/* const multer  = require('multer'); */
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const https = require('https');
const fs = require('fs');
const port = 8080;
app.use(express.static('public'));
app.use(express.static('uploads'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var User = require('./public/js/models/user');
/* var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ 
  storage: storage,
  limits: {
    fieldSize: 8 * 1024 * 1024,
    fieldNameSize: 8 * 1024 * 1024,
  },
 }); */

 mongoose.connect('mongodb://testUser:password123@ds123012.mlab.com:23012/personalisar', function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});


app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});


app.get('/',function(req,res) {
    res.sendFile('index.html');
});

app.post('/register', function(req, res, err){
  if (err) console.log(err);
  console.log(req.body);
  var newUserData = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUserData.save(function(error, record){
    if (error) console.log(error);
    console.log(record + " Successfully Uploaded!")
  });
});




/* app.post('/imageUpload', upload.single('image'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file.originalname);
}); */