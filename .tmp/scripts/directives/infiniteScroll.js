(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:overlay
    * @description
    * # overlay
   */
  angular.module('testApp').directive('infiniteScroll', function($rootScope) {
    return {
      scope: {
        itemsPerPage: '=',
        totalItems: '=',
        currentPage: '='
      },
      restrict: 'A',
      link: function($scope, elem, attrs) {
        console.log(11);
        return $('html').scroll(function() {
          console.log(11);
          if ($(window).scrollTop() === $(document).height() - $(window).height()) {
            return $scope.itemsPerPage += totalItems;
          }
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=infiniteScroll.js.map
