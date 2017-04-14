app.controller('mainController', function($scope, $http, $location) {


$scope.register = function(newUser){
  console.log("im submited new user " + newUser);
};

$scope.getUserName = function(){
  alert("im submit");
}
$scope.signUpBtn = function(){
  console.log("im singup button");
};


});
