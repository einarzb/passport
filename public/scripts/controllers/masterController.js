app.controller('masterController', function($scope, $state, authFactory) {
    authFactory.getCurrentUser(); //invokes factory function that fetches loggedin username
    $scope.currentUser = authFactory.currentUser;
    $scope.currentId = authFactory.currentUser._id;

    $scope.logout = function() {
        authFactory.logout();
        $state.go('logout');
      }
});
