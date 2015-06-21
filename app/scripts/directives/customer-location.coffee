'use strict'

###*
 # @ngdoc directive
 # @name testApp.directive:overlay
 # @description
 # # overlay
###
angular.module('testApp')
  .directive('customerLocation', ($rootScope, $location)->
    restrict: 'A'
    link: ($scope, elem, attrs) ->
      elem.click (e)->
        if $(e.target).hasClass('btn')
          return

        $scope.$apply ->
          $location.url attrs.customerLocation
  )
