(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:overlay
    * @description
    * # overlay
   */
  angular.module('testApp').directive('overlay', function($rootScope) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        return $rootScope.setOverlay = function(value, callback) {
          if (value) {
            elem.css('display', 'block');
            return elem.animate({
              opacity: 1
            }, 'fast', function() {
              if (callback) {
                callback();
              }
              return $scope.$apply();
            });
          } else {
            return elem.animate({
              opacity: 0
            }, 'fast', function() {
              elem.css('display', 'none');
              if (callback) {
                callback();
              }
              return $scope.$apply();
            });
          }
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=infinitieScroll.js.map
