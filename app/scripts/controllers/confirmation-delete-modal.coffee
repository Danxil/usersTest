'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:ConfirmationDeleteCtrl
 # @description
 # # ConfirmationDeleteCtrl
 # Controller of the testApp
###
angular.module 'testApp'
  .controller 'ConfirmationDeleteCtrl', ($scope, $modalInstance, selectedCustomers, $rootScope, customersManager) ->
    $scope.selectedCustomers = selectedCustomers

    $scope.delete = ->
      $rootScope.setOverlay(true)
      customersManager.deleteCustomers $scope.selectedCustomers, ->
        $rootScope.setOverlay(false)
        $modalInstance.close()

    $scope.cancel = ->
      $modalInstance.close()