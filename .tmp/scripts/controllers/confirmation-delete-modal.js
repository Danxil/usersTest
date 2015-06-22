(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:ConfirmationDeleteCtrl
    * @description
    * # ConfirmationDeleteCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('ConfirmationDeleteCtrl', function($scope, $modalInstance, selectedCustomers, $rootScope, customersManager) {
    $scope.selectedCustomers = selectedCustomers;
    $scope["delete"] = function() {
      $rootScope.setOverlay(true);
      return customersManager.deleteCustomers($scope.selectedCustomers, function() {
        $rootScope.setOverlay(false);
        return $modalInstance.close();
      });
    };
    return $scope.cancel = function() {
      return $modalInstance.close();
    };
  });

}).call(this);

//# sourceMappingURL=confirmation-delete-modal.js.map
