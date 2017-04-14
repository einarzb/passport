var app = angular.module('loginApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('home');
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/partial-home.html',
      controller: 'mainController'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'mainController'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'mainController'
    })
    .state('/auth/facebook', {
      url: '/auth/facebook',
      templateUrl: '/templates/facebook.html',
      controller: 'authController'
    })
    .state('success', {
      url: '/success',
      templateUrl: '/templates/success.html',
      controller: function($scope, $stateParams){
        $scope.loggedUserName = $stateParams;
      }
    })
    .state('error', {
      url: '/error',
      templateUrl: '/templates/error.html'
    })


});
