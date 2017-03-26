//require and set up
var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static('node_modules'));
app.use(express.static('public'));

//errors
//404 error
app.use(function(req, res, next){
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function () {
  console.log("authentication rocknroll 8000");
})
