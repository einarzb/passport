app.controller('masterController', function($scope, authFactory) {
    $scope.currentUser = authFactory.currentUser;
    console.log($scope.currentUser);
});
