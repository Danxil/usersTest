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
      customersManager.deleteCustomers $scope.selectedCustomers, ->
        $modalInstance.close()

    $scope.cancel = ->
      $modalInstance.close()