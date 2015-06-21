'use strict'

###*
 # @ngdoc directive
 # @name testApp.directive:overlay
 # @description
 # # overlay
###
angular.module('testApp')
  .directive('overlay', ($rootScope)->
    restrict: 'A'
    link: ($scope, elem, attrs) ->
      $rootScope.setOverlay = (value, callback)->
        if value
          elem.css 'display', 'block'
          elem.animate opacity: 1, 'fast', ->
            if callback then callback()
            $scope.$apply()
        else
          elem.animate opacity: 0, 'fast', ->
            elem.css 'display', 'none'
            if callback then callback()
            $scope.$apply()
  )
