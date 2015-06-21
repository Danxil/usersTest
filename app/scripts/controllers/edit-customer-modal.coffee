'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:EditCustomerCtrl
 # @description
 # # EditCustomerCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'EditCustomerModalCtrl',
  (customerData, $scope, $rootScope, customersManager, $location, $timeout, $controller, $modalInstance) ->
    angular.extend(this, $controller('EditCustomerCtrl', {$scope: $scope, customerData: customerData}));

    $scope.submit = ->
      $rootScope.setOverlay true

      customersManager.updateCustomer $scope.viewCustomer, ->
        $rootScope.setOverlay false, ->
          $modalInstance.close()

    $scope.cancel = ->
      $modalInstance.close()