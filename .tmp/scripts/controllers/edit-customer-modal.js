(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:EditCustomerCtrl
    * @description
    * # EditCustomerCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('EditCustomerModalCtrl', function(customerData, $scope, $rootScope, customersManager, $location, $timeout, $controller, $modalInstance) {
    angular.extend(this, $controller('EditCustomerCtrl', {
      $scope: $scope,
      customerData: customerData
    }));
    $scope.submit = function() {
      $rootScope.setOverlay(true);
      return customersManager.updateCustomer($scope.viewCustomer, function() {
        return $rootScope.setOverlay(false, function() {
          return $modalInstance.close();
        });
      });
    };
    return $scope.cancel = function() {
      return $modalInstance.close();
    };
  });

}).call(this);

//# sourceMappingURL=edit-customer-modal.js.map
