app.factory('authFactory', function($http) {
    var auth = {};

    auth.currentUser = {};

    auth.register = function(user) {
      console.log("im in factory register req");
      return $http.post('/users/register', user)
      .then(function(response){
        auth.currentUser = angular.copy(response.data)
      });
    };

    auth.login = function(user){
      console.log("im in factory login req");
      return $http.post('/users/login', user)
      .then(function(response){
        auth.currentUser = angular.copy(response.data)
    });
  };

    return auth;
  });
