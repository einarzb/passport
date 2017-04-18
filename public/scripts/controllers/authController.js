app.controller('authController', function($scope, $state, authFactory) {

    $scope.register = function(){
      console.log("im in authController", $scope.user.username);
      //using promise we can wait for a successful registration before we re-reroute the user.
      authFactory.register($scope.user)
      //if success - redirect to success page
      .then(function(){
        $state.go('success');
        //console.log($scope.user._id); cant get id
      //display error (mpl supply error's data)
      }, function(err){
        alert(err.data.message);
      });
    };

    $scope.login = function(){
      console.log($scope.user);
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
