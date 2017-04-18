var express = require('express');
var passport = require('passport');
var router = express.Router();
//mongoose model
var User = require('../models/userModel');

//checks if user object exists - if not - redirect to error page
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/error');
  }
};

//showing all users
router.get('/', function (req, res, next) {
  User.find(function (error, users) { //users is the route of .. users!
    if (error) {
      console.error(error)
      return next(error);
    }
    res.send(users);
  });
});

//A server route that serve the login form
router.get('../public/templates/login', function(req, res) {
  res.sendFile(__dirname + '/public/templates/login.html');
});

// functionality given to us via passport-local-mongoose
router.post('/register', function(req, res, next) {
  //register new user
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
            if (err) {
              console.log('Error registering!', err);
              return next(err);
            } //if success in register - user logged in
            req.login(user, function(err) {
              if (err) {
                return next(err);
            }//if login success -> send user name only! for security and bandwitch-->
            res.send(req.user.username);
          });
      });
  });


//route for fetching current user
//If an open session already exists on the server which matches the session ID in the client's request (found in the cookie)*,
// return the username;
  router.get('/currentuser', function(req, res) {
    if (req.user) {
      res.send(req.user.username);
      console.log(req.user.username, "im in authroutes");
    } else {
      res.send(null)
    }
  });


  // If this function gets called, authentication was successful!
  router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    console.log(req.user);
    let newArray = {
      username: req.user.username,
      id: req.user._id
    };
  // return res.send(req.user);
  return res.send(newArray);
});

//Passport's logout method removes the req.user property & clears the login session.
router.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
});






module.exports = router;
