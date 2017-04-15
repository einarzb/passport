app.factory('authFactory', function($http) {
    var auth = {};

    auth.register = function(user) {
      console.log("im in factory");
      return $http.post('/users/register', user);
    };
    return auth;
  });
