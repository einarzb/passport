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

});
