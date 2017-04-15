var express = require('express');
var passport = require('passport');
var router = express.Router();

//mongoose model
var User = require('../models/userModel');

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
            }//if login success -> send user name
            res.send(req.user.username);
          });
      });
  });

  // If this function gets called, authentication was successful!
  router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
  res.send(req.user.username)
});

//Passport's logout method removes the req.user property & clears the login session.
router.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
});


//fetch logged-in username - user is path parameter
// router.get('../success/:user', function (req, res){
//   //checks if user object exists - if not - redirect to error page
//           if (req.isAuthenticated()) {
//            res.send('Hey, ' + req.user + ', hello from the server!');
//          } else {
//            res.redirect('/error');
//          }
//     });




module.exports = router;
