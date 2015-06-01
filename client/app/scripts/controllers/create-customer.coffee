'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:CreateCustomerCtrl
 # @description
 # # CreateCustomerCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'CreateCustomerCtrl', ($scope, $rootScope, customersManager, $location) ->
    $scope.newCustomer =
      name: ''
      email: ''
      telephone: ''
      address: ''
      street: ''
      city: ''
      state: ''
      zip: ''

    $scope.submit = ->
      $rootScope.setOverlay true

      customersManager.createCustomer $scope.newCustomer, ->
        $rootScope.setOverlay false, ->
          $location.path '/home'
