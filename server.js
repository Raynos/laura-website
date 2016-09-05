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

app.get('/wayfare-magazine', function (req, res) {
  res.render('pages/wayfare');
});

app.get('/dutch-postage-stamps-booklet', function (req, res) {
  res.render('pages/stamps');
});

app.get('/chromium-tech-trade-show-banner', function (req, res) {
  res.render('pages/chromium');
});

app.get('/discover-oman-identity', function (req, res) {
  res.render('pages/oman');
});

app.get('/north-sea-jazz-poster', function (req, res) {
  res.render('pages/nsj');
});

app.get('/metro-nova-type-specimen', function (req, res) {
  res.render('pages/metro');
});

app.get('/logos', function (req, res) {
  res.render('pages/logos');
});

app.get('/2001-a-space-odyssey', function (req, res) {
  res.render('pages/space');
});

app.get('/alice-in-wonderland', function (req, res) {
  res.render('pages/alice');
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});