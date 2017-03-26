app.controller('mainController', function($scope) {
$scope.signUp = true;
$scope.loginScreen = false;
$scope.user;

$scope.signUpBtn = function(){
  $scope.signUp = false;
  $scope.loginScreen = true;
  $scope.user = req.session.passport.user; //output user name in nav bar


}

});
