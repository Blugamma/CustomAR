const express = require('express');
const app = express();
const server = require('http').Server(app); 
const io = require('socket.io')(server);
/* const multer  = require('multer'); */
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const https = require('https');
const fs = require('fs');
const port = 8080;
app.use(express.static('public'));
app.use(express.static('uploads'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());


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


server.listen(port, () => {
  console.log(`App is listening to ${port}`);
});


app.get('/',function(req,res) {
    res.sendFile('index.html');
});

app.post('/register', function(req, res, err){
  if (err) console.log(err);
  var newUserData = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  console.log(req.body);
  User.findOne({email: req.body.email}, function(err, obj) {
    if (err) console.log(err);
    if (obj){
      console.log("email already exists!");
      io.on('connection', function(socket) {  
        socket.emit('emailRegError', { message: 'Account already exists!' });
      });
      res.cookie('emailRegError', 'true', { maxAge: 900000 });
      res.redirect("/");
    }
    else{
      newUserData.save(function(error, record){
        if (error) console.log(error);
          console.log(record + " Successfully Uploaded!");
        });
        res.cookie('emailRegError', 'false', { maxAge: 900000 });
        res.redirect("/");
    }
    
   });
  


  

});

app.post('/login', function(req, res, err){
  if (err) console.log(err);
  User.findOne({email: req.body.email}, function(err, obj) { 
    if (err) console.log(err);
    console.log(obj);
    if (!obj){
      console.log("Your account doesn't exist");
      io.on('connection', function(socket) {  
        socket.emit('emailLoginError', { message: 'Username does not exist!' });
      });
      res.cookie('emailError', 'true', { maxAge: 900000 });
      res.redirect("/");
    }
   
    if (obj){
      const result = bcrypt.compareSync(req.body.password, obj.password);
      if (result){
        console.log("password is correct!");
        res.cookie('emailError', 'false', { maxAge: 900000 });
        res.cookie('passwordError', 'false', { maxAge: 900000 });
        res.redirect("/");
      } else {
        io.on('connection', function(socket) {  
          socket.emit('passwordLoginError', { message: 'Password is incorrect!' });
          
      });
      res.cookie('passwordError', 'true', { maxAge: 900000 });
      res.redirect("/");
      }
    }
    
  });
 
});




/* app.post('/imageUpload', upload.single('image'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file.originalname);
}); */