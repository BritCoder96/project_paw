var express = require('express');
var app = express();

var fs = require("fs");

require('dotenv').load();

var bodyParser = require('body-parser');
var multer  = require('multer');
const nodemailer = require('nodemailer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
express.json()

 
// POST route from contact form
app.post('/contactForm', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
       user: process.env.email,
       pass: process.env.password
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.email,
    subject: req.body.subject,
    text: '${req.body.name} (${req.body.email}) says: ${req.body.message}'
  };
  console.log('test')
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log(error)
      res.sendFile( __dirname + "/public/" + "index.html" );
    }
    else {
      console.log('success')
      res.sendFile( __dirname + "/public/" + "index.html" );
    }
  });
});

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})


var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Listening at http://%s:%s", host, port)

})