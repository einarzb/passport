app.factory('authFactory', function($http) {

  //the object that will hold users data
    var auth = {};
  //nested object for authenticated user details
  //importent for everything!
  
    auth.currentUser = {};
  //register function
    auth.register = function(user) {
      console.log("im in authfactory register func");
      return $http.post('/users/register', user)
      .then(function(response){
        console.log(response);//output object
        console.log(response.data);//output username
        auth.currentUser = angular.copy(response.data);
        console.log(auth.currentUser); //output username
        //console.log(auth.currentUser._id); - cant get id
      });
    };

//login
    auth.login = function(user){
      console.log("im in factory login func");
      return $http.post('/users/login', user)
      .then(function(response){
        auth.currentUser = angular.copy(response.data);
        console.log(auth.currentUser); //loggedin username
    });
  };

//fetch users name
  auth.getCurrentUser = function(){
    return $http.get('/users/currentuser')
    .then(function(response){
      auth.currentUser.username = angular.copy(response.data);
      console.log(auth.currentUser.username);
    });
  }
    return auth;
  });
