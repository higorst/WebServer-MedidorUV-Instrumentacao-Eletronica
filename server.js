const express = require('express');
let request = require('request');
var path = require('path');

const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/getUV', function(req, res) {
   request('http://192.168.0.120/', function (error, response, body) {
      res.send(body)
   });
});

app.listen(3000, function() {
   console.log('Rodando porta 3000');
});
