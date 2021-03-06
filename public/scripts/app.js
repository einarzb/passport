var app = angular.module('loginApp', ['ui.router', 'ngMessages']);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  //hashbang fix
  $locationProvider.html5Mode(true);
  //default state
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/partial-home.html',
      controller: 'mainController'
    })

    //authentication states//
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'authController'
    })

    .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'authController'
    })

    .state('logout', {
      url: '/logout',
      templateUrl: '/templates/logout.html',
      controller: 'authController'
    })

    .state('/auth/facebook', {
      url: '/auth/facebook',
      templateUrl: '/templates/facebook.html',
      controller: 'authController'
    })

    .state('success', {
      url: '/success',
      templateUrl: '/templates/success.html',
      controller: 'masterController' //navbar controller
    })
    .state('error', {
      url: '/error',
      templateUrl: '/templates/error.html'
    })



}]);
