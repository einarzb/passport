app.controller('authController', function($scope, $http, $location, $state, authFactory) {

    $scope.register = function(){
      console.log("im in authController", $scope.user);
      authFactory.register($scope.user)
      //using promise we can wait for a successful registration before we re-reroute the user.
      .then(function(){
        $state.go('success');
      //display error
      }, function(err){
        alert(err.data.message);
      });
    };

    $scope.login = function(){
      console.log("im in authController login button", $scope.user);
      authFactory.login($scope.user)
      //using promise we can wait for a successful registration before we re-reroute the user.
      .then(function(){
        $state.go('success');
      //display error
      }, function(err){
        alert(err.data); //different error is thrown by passport-authenticate
      });
    };

});
