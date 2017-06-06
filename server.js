// server.js
// where your node app starts

// init project
var express = require('express');
// var lessMiddleware = require('less-middleware');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
// app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

/*
  TABLE USED FOR GLITCH.COM "Show demo"
  
  "{{URL ON WEBSITE}}": "{{pages/page-name}}"
*/
var PAGES = {
  "/": "pages/index",
  "/about": "pages/about",
  "/what-we-do": "pages/what-we-do",
  "/alice-in-wonderland": "pages/alice",
  "/bionews-online-newsletter": "pages/bionews",
  "/chromium-tech-trade-show-banner": "pages/chromium",
  "/eco-club": "pages/eco",
  "/feed": "pages/feed",
  "/homestyle": "pages/homestyle",
  "/logos": "pages/logos",
  "/metro-nova-type-specimen": "pages/metro",
  "/north-sea-jazz-poster": "pages/nsj",
  "/discover-oman-identity": "pages/oman",
  "/reef-protectors": "pages/reef",
  "/saba-sea-scouts": "pages/seascouts",
  "/2001-a-space-odyssey": "pages/space",
  "/dutch-postage-stamps-booklet": "pages/stamps",
  "/wayfare-magazine": "pages/wayfare"
}

var keys = Object.keys(PAGES);
keys.forEach(function (key) {
  app.get(key, function (request, response) {
    response.render(PAGES[key]);
  });
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});