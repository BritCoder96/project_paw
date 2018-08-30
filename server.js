var express = require('express');
var app = express();

var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})


var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at http://%s:%s", host, port)

})