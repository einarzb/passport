app.factory('authFactory', function($http) {
    var auth = {};

    auth.register = function(user) {
      console.log("im in factory register req");
      return $http.post('/users/register', user);
    };

    auth.login = function(user){
      console.log("im in factory login req");
      return $http.post('/users/login', user);
    };

    return auth;
  });
