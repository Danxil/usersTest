'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:EditCustomerCtrl
 # @description
 # # EditCustomerCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'EditCustomerCtrl', ($scope, $rootScope, $routeParams, customersManager, $q, $location) ->
    defaultCustomer = null

    $q.when customersManager.fetchCustomers($routeParams.id), (data)->
      defaultCustomer = data
      $scope.viewCustomer = data.toJSON()

    $scope.submit = ->
      sendCustomer = angular.copy(defaultCustomer)

      _.each sendCustomer, (item, key)->
        if key == 'id'
          return

        if item != $scope.viewCustomer[key] && $scope.viewCustomer[key]
          sendCustomer[key] = $scope.viewCustomer[key]
        else
          delete sendCustomer[key]

      wasUpdated = angular.copy sendCustomer
      delete wasUpdated['id']

      $rootScope.setOverlay true

      if _.isEmpty wasUpdated
        $rootScope.setOverlay false, ->
          $location.path '/home'

        return

      $q.when sendCustomer.$update(), ->
        $rootScope.setOverlay false, ->
          $location.path '/home'
