app.controller('authController', function($scope, $http, $location, $state) {

    $scope.register = function(newUser){
      console.log("im in authController");
      console.log(newUser);
      //clear input fields
      $scope.username = "";
      $state.go('success');
    }
});
