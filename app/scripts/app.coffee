'use strict'


###*
 # @ngdoc overview
 # @name testApp
 # @description
 # # testApp
 #
 # Main module of the application.
###
app = angular
.module('testApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
app.config ($routeProvider) ->
  $routeProvider
    .when '/home/:page?/:currentPage?',
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
    .otherwise
      redirectTo: '/home'

