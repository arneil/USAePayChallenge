var express = require('express');
var router = express.Router();
var rp = require('request-promise');

//gen auth token here
var sha256 = require('js-sha256');

var seed = Math.random();
var apikey = "_1cn3Tg85kxwZQ1Olic34myGa3neK7qU"
var apipin = "1234"
var prehash = apikey + seed + apipin;
var apihash = 's2/'+ seed + '/' + sha256(prehash);
var authKey = new Buffer(apikey + ":" + apihash).toString('base64')

router.post('/sale', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: 'https://sandbox.usaepay.com/api/v2/transactions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ('Basic ' + authKey)
    },
    body: req.body,
    json: true
  };

  rp(options)
    .then(function(parsedBody) {
      res.json(parsedBody);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.post('/error', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: 'https://httpstat.us/500',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ('Basic ' + authKey)
    },
    body: req.body,
    json: true
  };

  rp(options)
    .then(function(parsedBody) {
      res.json(parsedBody);
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
