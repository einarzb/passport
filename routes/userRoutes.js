var express = require('express');
var router = express.Router();
var passport = require('passport');
//mongoose model
var User = require('../models/userModel');

//A server route that serve the login form
router.get('../public/templates/login', function(req, res) {
  res.sendFile(__dirname + '/public/templates/login.html');
});

router.post('/register', function(req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
            if (err) {
              console.log('Error registering!', err);
              return next(err);
            } //if success - user login
            req.login(user, function(err) {
              if (err) {
                return next(err);
            }//if login success - sends user name
            res.send(req.user);
          });
      });
  });

  router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user.username)
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

//Passport's logout method removes the req.user property and clears the login session.
router.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
});


module.exports = router;
