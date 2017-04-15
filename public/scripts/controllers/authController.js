app.controller('authController', function($scope, $http, $location) {
  
    $scope.register = function(newUser){
      console.log("im in authController");
      if (newUser.username === newUser.passwordConfirm) {
          console.log("password are the same");
      } else {
        $scope.missmatch = false;
      };
    }
});
