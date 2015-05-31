'use strict'

###*
 # @ngdoc directive
 # @name testApp.directive:editCustomersLabel
 # @description
 # # editCustomersLabel
###
angular.module('testApp')
  .directive('editCustomerLabel', ->
    restrict: 'E'
    scope:
      fieldName: '@'
    template: '{{label}}'
    link: ($scope, elem) ->
      labels =
        name: 'Name'
        email: 'Email'
        telephone: 'Phone number'
        address: 'Address'
        street: 'Street name'
        city: 'City name'
        state: 'State'
        zip: 'Zip number'

      $scope.label = labels[$scope.fieldName]
  )
