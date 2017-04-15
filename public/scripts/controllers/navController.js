app.controller('NavCtrl', function($scope, $http, $location) {




//maybe in resolve

//hide log in and register buttons

//show log out button

  //getting user name (yohai help)
  $scope.user = getParameterByName('username');

  $scope.getUserName = function(){
    return $http.get('/success').then(function(response){
   alert(response);
     $scope.user = response.data;
    });
  };

  //yohai function for getting user name
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

});
