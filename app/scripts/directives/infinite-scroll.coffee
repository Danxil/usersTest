'use strict'

###*
 # @ngdoc directive
 # @name testApp.directive:overlay
 # @description
 # # overlay
###
angular.module('testApp')
  .directive('infiniteScroll', ($rootScope, $timeout)->
    scope:
      infScrollCtrl: '=infiniteScroll'
      infDisabled: '='
    restrict: 'A'
    link: ($scope, elem, attrs) ->

      $(window).scroll ->
        if $scope.infDisabled
          return

        if $(window).scrollTop() + $(window).height() > $(document).height() - 100
          if $scope.infScrollCtrl.onScroll then $scope.infScrollCtrl.onScroll()
          $scope.$apply()

      $scope.$watch 'infDisabled', (val)->
        if !val
          if $scope.infScrollCtrl.onEnabled then $scope.infScrollCtrl.onEnabled()

      if $scope.infScrollCtrl.onInit then $scope.infScrollCtrl.onInit()
  )
