//package requirements
var express = require('express');
//passport use it in the background.
var bodyParser = require('body-parser');
var passport = require('passport');
//most common & traditional strategy to authenticates a person using username & password.
var LocalStrategy = require('passport-local').Strategy;
//enable sessions and has Express' built-in session store (MemoryStore) so that user dont have to login when visiting diffe' pages
var expressSession = require('express-session');

//var FacebookStrategy = require('passport-facebook').Strategy; //facebook yeahy!
//var MongoStore = require('connect-mongo')(express);

//on AIR
var app = express();

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//express session middleware - must be placed here (above passport.initialize)
//tells express to use it and configure with secret key which create cookie!!
app.use(expressSession({
  secret:"thisIsASecret",
  resave: false,
  saveUninitialized: false
  //store: new MongoStore({ url: 'mongodb://localhost/logindb'})
}));

// initializes passport and tells Express we want to use it as middleware
app.use(passport.initialize());

//***must be placed here***
//makes sure our app is using passport's-session middleware!
app.use(passport.session());

//STEP 3:
//when user logs in- we tell passport what information is required in order to identify a logged-in user.
passport.serializeUser(function(user, done){ //done - passport's callback function from **line 55**
//session is being created
  done(null, user.username); //we can choose the information we want to store in the user's session
});

//if passport finds that the session ID (cookie) sent by our browser === session ID(cookie) -
//then it needs to deserialize the data (decrypt user info that was stored in 'user' property)
passport.deserializeUser(function(user, done) {
  done(null, user);
});

//setup directories for server access
app.use(express.static('node_modules'));
app.use(express.static('public'));

//STEP 2: hard coded
//verify callback used to decide whether to authenticate a user or not.
//passport middleware that is a verify callback function
passport.use(new LocalStrategy(function(username, password, done) {
  //username & password comes from /POST/ route
  if ((username === "John") && (password === "password")) {
    //if success: username is passed as the first parameter to the serializeUser callback function **line 38**
    return done(null, { username: username, id: 1 });
  } else { //false - user not exist
    return done(null, false);
  }
}));

// var FACEBOOK_APP_ID = '262419510459321',
//     FACEBOOK_APP_SECRET = 'cd473945b1f92a78e811c4b2c6c810cd';
//
// var fbOpts = {
//   clientID : FACEBOOK_APP_ID,
//   clientSecret: FACEBOOK_APP_SECRET,
//   callbackURL: 'http://localhost:8000/auth/facebook/callback'
// };
//
// var fbCallback = function(accessToken, refreshToken, profile, cb){
// console.log(accessToken, refreshToken, profile, cb);
// }
//
// //facebook authentication
// passport.use(new FacebookStrategy(fbOpts, fbCallback));
//
// //routing//
// //facebook
// app.route('/')
// .get(passport.authenticate('facebook'));
//
// app.route('auth/facebook/callback')
//  .get(passport.authenticate('facebook',function (err, user, info){
//    console.log(err, user, info);
//  }));

//A server route that serve the login form
app.get('/public/templates/login', function(req, res) {
  res.sendFile(__dirname + '/public/templates/login.html');
});

//fetch logged-in username
//user is path parameter
app.get('/success/:user', function (req, res){
  //checks if user object exists - if not - redirect to error page
          if (req.isAuthenticated()) {
           res.send('Hey, ' + req.user + ', hello from the server!');
         } else {
           res.redirect('/error');
         }
    });

//STEP 1:
//takes username & password inputs from the request body and pass them to passport's done function **line 58**
app.post('/public/templates/login',
//passport.authenticate - middleware that takes two arguments (passport strategy, redirect routes)
passport.authenticate('local', {
  successRedirect: '/success/:user',
  failureRedirect: '/error'
}));

//Passport's logout method removes the req.user property and clears the login session.
app.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
});


//catch-all route: - without the hash-bang, the server is handling the routing
//ensure that any unhandled requests are served by simply sending index.html.
app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
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

/*Explanation:
A person fills out the form at localhost:8000/login, and submits.
A POST request is sent to the server.
On the server, the passport.authenticate middleware invokes the verify function.
If the "login" is successful, the done method will call the serializeUser callback.
This saves the user data in a session.
The user will also be redirected to the /success route.
*/
