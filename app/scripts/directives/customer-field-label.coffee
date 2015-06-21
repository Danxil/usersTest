'use strict'

###*
 # @ngdoc directive
 # @name testApp.directive:editCustomersLabel
 # @description
 # # editCustomersLabel
###
angular.module('testApp')
  .directive('customerFieldLabel', ->
    restrict: 'E'
    scope:
      fieldName: '@'
    template: '{{label}}'
    link: ($scope, elem) ->
      labels =
        firstName: 'First name'
        lastName: 'Last name'
        email: 'Email'
        age: 'Age'

      $scope.label = labels[$scope.fieldName]
  )
