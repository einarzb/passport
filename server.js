//require and set up
var express = require('express');
var expressSession = require('express-session'); //to enable sessions in express
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser'); //passport use it in the background.
var LocalStrategy = require('passport-local').Strategy; //The most common and traditional strategy simply authenticates a person using a username and a password.
//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static('node_modules'));
app.use(express.static('public'));

//takes the username and password fields from the request body and passes them to our "verify callback"
app.post('/login', passport.authenticate('local', {  //middleware that takes two arguments (strategy)
  successRedirect: '/success',
  failureRedirect: '/login',
}));

//hard coded verify callback used to decide whether to authenticate a user or not.
passport.use(new LocalStrategy(function(username, password, done) { //username & password comes from post route
  if ((username === "John") && (password === "password")) {
    return done(null, { username: username, id: 1 }); //callback function that we call to say if the authentication went OK or not
  } else {
    return done(null, false);
  }
}));

app.get('/success', function (req, res) {
  res.send('hey, hello from the server');
})

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/login.html')
});


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
