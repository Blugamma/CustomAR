const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const port = 8080;
app.use(express.static('public'));


app.get('/',function(req,res) {
    res.sendFile('index.html');
  });

// we will pass our 'app' to 'https' server
app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});
