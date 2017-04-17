app.controller('masterController', function($scope, authFactory) {
    $scope.currentUser = authFactory.currentUser.username;
    console.log("im in masterController");
    // console.log($scope.currentUser.username);
});
