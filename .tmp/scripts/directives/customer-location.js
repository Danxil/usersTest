(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:overlay
    * @description
    * # overlay
   */
  angular.module('testApp').directive('customerLocation', function($rootScope, $location) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        return elem.click(function(e) {
          if ($(e.target).hasClass('btn')) {
            return;
          }
          return $scope.$apply(function() {
            return $location.url(attrs.customerLocation);
          });
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=customer-location.js.map
