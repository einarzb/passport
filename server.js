//require and set up
var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser'); //passport use it in the background.
var LocalStrategy = require('passport-local').Strategy; //The most common and traditional strategy simply authenticates a person using a username and a password.
var expressSession = require('express-session'); //enable sessions in express

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//must be above passport.initialize
app.use(expressSession({ //tells express to use and configure it with secret key
  secret:"thisIsASecret",
  resave: false,
  saveUninitialized: false
  }));
app.use(passport.initialize());
//must be added bwloe initialize
app.use(passport.session()); //makes sure our app is using passport's session middleware

app.use(express.static('node_modules'));
app.use(express.static('public'));

//when someone logs in we tell passport what information is required in order to identify a logged in user.
passport.serializeUser(function(user, done){
  done(null, user.username); //we can choose the information we want to store in the user's session
});

//hard coded verify callback used to decide whether to authenticate a user or not.
passport.use(new LocalStrategy(function(username, password, done) { //username & password comes from post route
  if ((username === "John") && (password === "password")) {
    //The user data is passed as the first parameter to the serializeUser callback function
    return done(null, { username: username, id: 1 }); //callback function that we call to say if the authentication went OK or not
  } else {
    return done(null, false);
  }
}));

//routing
app.get('/success', function (req, res) {
  res.send('hey, hello from the server');
});

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/login.html')
});

//takes the username and password fields from the request body and passes them to our "verify callback"
app.post('/login', passport.authenticate('local', {  //middleware that takes two arguments (strategy)
  successRedirect: '/success',
  failureRedirect: '/login',
}));

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
