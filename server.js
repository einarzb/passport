//require and set up
var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser'); //passport use it in the background.
var LocalStrategy = require('passport-local').Strategy; //The most common and traditional strategy simply authenticates a person using a username and a password.
var expressSession = require('express-session'); //enable sessions and has Express' built-in session store called MemoryStore
//var MongoStore = require('connect-mongo')(express);

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//must be above passport.initialize
app.use(expressSession({ //tells express to use and configure it with secret key
  secret:"thisIsASecret",
  resave: false,
  saveUninitialized: false,
  //store: new MongoStore({ url: 'mongodb://localhost/logindb'})
  }));
//defines a function on the request object named isAuthenticated()
app.use(passport.initialize());
//must be added bwloe initialize
app.use(passport.session()); //makes sure our app is using passport's session middleware

app.use(express.static('node_modules'));
app.use(express.static('public'));

//STEP 3: when someone logs in we tell passport what information is required in order to identify a logged in user.
passport.serializeUser(function(user, done){
  done(null, user.username); //we can choose the information we want to store in the user's session
});

//Our browser sends cookie data when we visit the site as part of the request headers.
//If passport finds that the session ID sent by our browser === a session ID
// then it needs to deserialize the data.
passport.deserializeUser(function(user, done) { //passport decrypt user info that was stored in 'user' property
  done(null, user);
});

//STEP 2: hard coded verify callback used to decide whether to authenticate a user or not.
passport.use(new LocalStrategy(function(username, password, done) { //username & password comes from post route
  if ((username === "John") && (password === "password")) {
    //The user data is passed as the first parameter to the serializeUser callback function
    return done(null, { username: username, id: 1 }); //the done method will call the serializeUser callback
  } else {
    return done(null, false);
  }
}));

//routing
//success
app.get('/success', function (req, res){
  //validation - handles unauthorized access
  if (req.isAuthenticated()) { //passport's built-in method
    res.send('Hey, ' + req.user + ', hello from the server!');
  } else {
    res.redirect('/login') //maybe redirect to sign up
  }
});

//login
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/login.html')
});

//logout - Passport's logout method removes the req.user property and clears the login session.
app.get('/logout', function(req, res){
  req.logout();
  res.send("logged out");
});

//STEP 1: takes the username and password fields from the request body and passes them to our "verify callback"
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

/*Explanation:
A person fills out the form at localhost:8000/login, and submits.
A POST request is sent to the server.
On the server, the passport.authenticate middleware invokes the verify function.
If the "login" is successful, the done method will call the serializeUser callback.
This saves the user data in a session.
The user will also be redirected to the /success route.
*/
