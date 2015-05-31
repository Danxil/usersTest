'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:HomeCtrl
 # @description
 # # HomeCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'HomeCtrl', ($scope, customersManager, $q) ->
    $q.when customersManager.fetchCustomers(), (data)->
      $scope.customers = data
