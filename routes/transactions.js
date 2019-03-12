var express = require('express');
var router = express.Router();
var rp = require('request-promise');

//gen auth token here

router.post('/sale', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: 'https://sandbox.usaepay.com/api/v2/transactions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic X1Y4N1F0YjUxM0NkM3ZhYk03UkMwVGJ0SldlU284cDc6czIvYWJjZGVmZ2hpamtsbW5vcC9iNzRjMmZhOTFmYjBhMDk3NTVlMzc3ZWU4ZTIwYWE4NmQyYjkyYzNkMmYyNzcyODBkYjU5NWY2MzZiYjE5MGU2'
    },
    body: req.body,
    json: true
  };

  rp(options)
    .then(function(parsedBody) {
      res.json(parsedBody);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
