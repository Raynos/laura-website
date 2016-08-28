// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.set('view engine', 'ejs');

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render('pages/index');
});

app.get('/about', function (request, response) {
  response.render('pages/about');
});

app.get('/what-we-do', function (request, response) {
  response.render('pages/what-we-do');
});

app.get('/feed', function (request, response) {
  response.render('pages/feed');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});