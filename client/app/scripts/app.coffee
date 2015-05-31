'use strict'

###*
 # @ngdoc overview
 # @name testApp
 # @description
 # # testApp
 #
 # Main module of the application.
###
angular
  .module('testApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/home',
        templateUrl: 'views/home.html'
        controller: 'HomeCtrl'
      .when '/edit-customer/:id',
        templateUrl: 'views/edit-customer.html'
        controller: 'EditCustomerCtrl'
      .otherwise
        redirectTo: '/home'

