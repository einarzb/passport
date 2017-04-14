app.controller('mainController', function($scope, $http, $location) {
$scope.signUp = true;
$scope.loginScreen = false;

$scope.user = getParameterByName('username');


$scope.signUpBtn = function(){
  $scope.signUp = false;
  $scope.loginScreen = true;
};

$scope.getUserName = function(){
  return $http.get('/success').then(function(response){
//  alert(response);
  //  $scope.user = response.data;
  });
}

});


function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
