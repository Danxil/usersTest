(function() {
  'use strict';

  /**
    * @ngdoc overview
    * @name testApp
    * @description
    * # testApp
    *
    * Main module of the application.
   */
  var app;

  app = angular.module('testApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap']);

  app.config(function($routeProvider) {
    return $routeProvider.when('/home/:page?/:currentPage?', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      resolve: {
        customersData: function($q, customersManager, $rootScope, $timeout) {
          var deferred;
          $rootScope.setOverlay(true);
          deferred = $q.defer();
          $q.when(customersManager.getOrFetchCustomers(), function(data) {
            return $timeout(function() {
              $rootScope.setOverlay(false);
              return deferred.resolve(data);
            }, 1000);
          });
          return deferred.promise;
        }
      }
    }).when('/edit-customer/:id', {
      templateUrl: 'views/edit-customer.html',
      controller: 'EditCustomerCtrl',
      resolve: {
        customerData: function($q, customersManager, $route) {
          var deferred;
          deferred = $q.defer();
          customersManager.getOrFetchCustomers($route.current.params.id, function(data) {
            return deferred.resolve(data);
          });
          return deferred.promise;
        }
      }
    }).otherwise({
      redirectTo: '/home'
    });
  });

}).call(this);

//# sourceMappingURL=app.js.map
