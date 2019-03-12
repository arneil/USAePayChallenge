//Install express server
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var transactions = require("./routes/transactions");

var app = express();
app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(express.static('./dist/GundamStore'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/GundamStore/index.html'));
});

// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

app.use('/transactions', transactions);
