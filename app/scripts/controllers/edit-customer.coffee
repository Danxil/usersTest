'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:EditCustomerCtrl
 # @description
 # # EditCustomerCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'EditCustomerCtrl',
  (customerData, $scope, $rootScope, customersManager, $location, $timeout) ->
    filterUpdatedFieldsFn = (viewCustomer, defaultCustomer)->
      viewCustomer = angular.copy(viewCustomer)
      _.each viewCustomer, (item, key)->
        if key == 'id'
          return

        if item == defaultCustomer[key]
          delete viewCustomer[key]

      viewCustomer

    wasUpdatedFn = (sendCustomer, defaultCustomer)->
      filteredFields = filterUpdatedFieldsFn $scope.viewCustomer, defaultCustomer
      delete filteredFields['id']
      !_.isEmpty filteredFields

    defaultCustomer = angular.copy customerData
    $scope.viewCustomer = angular.copy customerData

    $scope.$watchCollection 'viewCustomer', ->
      $timeout ->
        $scope.wasUpdated = wasUpdatedFn $scope.viewCustomer, defaultCustomer

    $scope.submit = ->
      $rootScope.setOverlay true

      customersManager.updateCustomer $scope.viewCustomer, ->
        $rootScope.setOverlay false, ->
          $location.path '/home'