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
      name: 'wadawd'
      email: 'awdwad@wadw.wad'
      telephone: '22-22-22'
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
