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
        resolve:
          customersData: ($q, customersManager) ->
            deferred = $q.defer()
            $q.when customersManager.getOrFetchCustomers(), (data)->
              deferred.resolve data

            deferred.promise

      .when '/edit-customer/:id',
        templateUrl: 'views/edit-customer.html'
        controller: 'EditCustomerCtrl'
        resolve:
          customerData: ($q, customersManager, $route) ->
            deferred = $q.defer()
            customersManager.getOrFetchCustomers $route.current.params.id, (data)->
              deferred.resolve data

            deferred.promise

      .when '/create-customer',
        templateUrl: 'views/create-customer.html'
        controller: 'CreateCustomerCtrl'
      .otherwise
        redirectTo: '/home'

