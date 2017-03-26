app.controller('mainController', function($scope) {
$scope.signUp = true;
$scope.loginScreen = false;
$scope.signUpBtn = function(){
  $scope.signUp = false;
  $scope.loginScreen = true;

}

});
