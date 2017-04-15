//package requirements
const express = require('express');
const expressSession = require('express-session'); //enable sessions
const bodyParser = require('body-parser');//passport use it in the background.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;//most common & traditional strategy to authenticates a person using username & password.
const mongoose = require('mongoose');

//routing requirements
const authRoutes = require('./routes/authRoutes');

//mongoose models
const User = require('./models/userModel');

//var FacebookStrategy = require('passport-facebook').Strategy; //facebook yeahy!

//on AIR
const app = express();
mongoose.connect('mongodb://localhost/usersdb', function(err){
  if (err) throw err;
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setup directories for server access
app.use(express.static('node_modules'));
app.use(express.static('public'));

//serve routings
app.use('/auth', authRoutes);

//Configure passport with secret key which create cookie!! and session middleware
app.use(expressSession({
  secret:"thisIsASecret",
  resave: false,
  saveUninitialized: false
}));

// initializes passport and tells Express we want to use it as middleware
app.use(passport.initialize());
//makes sure our app is using passport's-session middleware!
app.use(passport.session());

// Configure passport-local to use User Model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



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



//catch-all route: - without the hash-bang, the server is handling the routing
//ensure that any unhandled requests are served by simply sending index.html.
//instead of 404 error
app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
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
