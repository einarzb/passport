app.controller('mainController', function($scope) {
$scope.signUp = true;
$scope.loginScreen = false;
$scope.user;

$scope.signUpBtn = function(){
  $scope.signUp = false;
  $scope.loginScreen = true;
  $scope.user = req.user;


}

});
