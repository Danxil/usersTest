'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:HomeCtrl
 # @description
 # # HomeCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'HomeCtrl', (customersData, $scope, customersManager, $q) ->
    $scope.customers = customersData
