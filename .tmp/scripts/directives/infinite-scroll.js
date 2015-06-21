(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:overlay
    * @description
    * # overlay
   */
  angular.module('testApp').directive('infiniteScroll', function($rootScope, $timeout) {
    return {
      scope: {
        infScrollCtrl: '=infiniteScroll',
        infDisabled: '='
      },
      restrict: 'A',
      link: function($scope, elem, attrs) {
        $(window).scroll(function() {
          if ($scope.infDisabled) {
            return;
          }
          if ($(window).scrollTop() === $(document).height() - $(window).height()) {
            if ($scope.infScrollCtrl.onScroll) {
              $scope.infScrollCtrl.onScroll();
            }
            return $scope.$apply();
          }
        });
        $scope.$watch('infDisabled', function(val) {
          if (!val) {
            if ($scope.infScrollCtrl.onEnabled) {
              return $scope.infScrollCtrl.onEnabled();
            }
          }
        });
        if ($scope.infScrollCtrl.onInit) {
          return $scope.infScrollCtrl.onInit();
        }
      }
    };
  });

}).call(this);

//# sourceMappingURL=infinite-scroll.js.map
