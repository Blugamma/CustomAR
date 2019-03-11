const express = require('express');
const app = express();
const multer  = require('multer');
const https = require('https');
const fs = require('fs');
const port = 8080;
app.use(express.static('public'));
app.use(express.static('uploads'));

var storage = multer.diskStorage({
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
 });

app.get('/',function(req,res) {
    res.sendFile('index.html');
  });

// we will pass our 'app' to 'https' server
app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});

app.post('/imageUpload', upload.single('image'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file.originalname);
});