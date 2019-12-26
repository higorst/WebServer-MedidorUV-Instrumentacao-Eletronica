const express = require('express');
let request = require('request');
var path = require('path');

var fs = require('fs');

const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/getUV', function (req, res) {
   request('http://192.168.0.100/', function (error, response, body) {

      // UV - TEMPERATURA - UMIDADE
      //body = "1500,25.00,33.00"
      let receive = body.split(',');
      if (receive[0] < 10) {
         receive[0] = '0'
      }
      else if (receive[0] >= 10 && receive[0] < 65) {
         receive[0] = '1'
      }
      else if (receive[0] >= 65 && receive[0] < 83) {
         receive[0] = '2'
      }
      else if (receive[0] >= 83 && receive[0] < 103) {
         receive[0] = '3'
      }
      else if (receive[0] >= 103 && receive[0] < 124) {
         receive[0] = '4'
      }
      else if (receive[0] >= 124 && receive[0] < 142) {
         receive[0] = '5'
      }
      else if (receive[0] >= 142 && receive[0] < 162) {
         receive[0] = '6'
      }
      else if (receive[0] >= 162 && receive[0] < 180) {
         receive[0] = '7'
      }
      else if (receive[0] >= 180 && receive[0] < 200) {
         receive[0] = '8'
      }
      else if (receive[0] >= 200 && receive[0] < 221) {
         receive[0] = '9'
      }
      else if (receive[0] >= 221 && receive[0] < 240) {
         receive[0] = '10'
      }
      else {
         receive[0] = '11'
      }

      let date_ob = new Date();
      // current date
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      // current year
      let year = date_ob.getFullYear();
      // current hours
      let hours = date_ob.getHours();
      // current minutes
      let minutes = date_ob.getMinutes();
      // current seconds
      let seconds = date_ob.getSeconds();

      if(hours < 10){
         hours = "0" + hours
      }
      if(minutes < 10){
         minutes = "0" + minutes
      }
      if(seconds < 10){
         seconds = "0" + seconds
      }
      if(parseInt(receive[0]) < 10){
         receive[0] = " " + receive[0]
      }
      let dados = " " + receive[0] + "       " + receive[1] + "       " + receive[2] + "    " + date + "/" + month + "/" + year + "   " + hours + ":" + minutes + ":" + seconds + "\n"
      // Escrita de dados coletados
      //fs.writeFile('/home/higor/Documents/GitHub/MedidorUV WebServer/Backend/dados.txt', dados, { enconding: 'utf-8', flag: 'a' }, function (err) {
         //if (err) throw err;
         // console.log('Arquivo salvo!');
      //});

      res.send(body)
   });
});

app.listen(3000, function () {
   console.log('Rodando porta 3000');
});
