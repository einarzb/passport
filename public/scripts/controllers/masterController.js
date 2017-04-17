app.controller('masterController', function($scope, authFactory) {
    authFactory.getCurrentUser(); //invokes factory function that fetches loggedin username
    $scope.currentUser = authFactory.currentUser;
    $scope.currentId = authFactory.currentUser._id;
});
