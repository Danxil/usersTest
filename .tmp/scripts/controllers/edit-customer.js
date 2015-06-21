(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:EditCustomerCtrl
    * @description
    * # EditCustomerCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('EditCustomerCtrl', function(customerData, $scope, $rootScope, customersManager, $location, $timeout) {
    var defaultCustomer, filterUpdatedFieldsFn, wasUpdatedFn;
    filterUpdatedFieldsFn = function(viewCustomer, defaultCustomer) {
      viewCustomer = angular.copy(viewCustomer);
      _.each(viewCustomer, function(item, key) {
        if (key === 'id') {
          return;
        }
        if (item === defaultCustomer[key]) {
          return delete viewCustomer[key];
        }
      });
      return viewCustomer;
    };
    wasUpdatedFn = function(sendCustomer, defaultCustomer) {
      var filteredFields;
      filteredFields = filterUpdatedFieldsFn($scope.viewCustomer, defaultCustomer);
      delete filteredFields['id'];
      return !_.isEmpty(filteredFields);
    };
    defaultCustomer = angular.copy(customerData);
    $scope.viewCustomer = angular.copy(customerData);
    $scope.$watchCollection('viewCustomer', function() {
      return $timeout(function() {
        return $scope.wasUpdated = wasUpdatedFn($scope.viewCustomer, defaultCustomer);
      });
    });
    return $scope.submit = function() {
      $rootScope.setOverlay(true);
      return customersManager.updateCustomer($scope.viewCustomer, function() {
        return $rootScope.setOverlay(false, function() {
          return $location.path('/home');
        });
      });
    };
  });

}).call(this);

//# sourceMappingURL=edit-customer.js.map
