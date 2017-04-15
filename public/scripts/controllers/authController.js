app.controller('authController', function($scope, $http, $location) {

    $scope.register = function(newUser){
      console.log("im in authController");
      console.log(newUser);
    }
});
