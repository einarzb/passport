app.controller('authController', function($scope, $http, $location) {
    $scope.register = function(newUser){
      console.log("im in authController");
      console.log(newUser);
      console.log(newUser.username);
      if (newUser.username === newUser.passwordConfirm) {
          console.log("password are the same");
      } else {
        console.log("password dont match");
      };
    }
});
