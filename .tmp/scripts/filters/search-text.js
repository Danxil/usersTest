(function() {
  'use strict';

  /**
    * @ngdoc filter
    * @name testApp.filter:searchText
    * @function
    * @description
    * # searchText
    * Filter in the testApp.
   */
  angular.module('testApp').filter('searchText', function() {
    return function(text, arr) {
      console.log(text);
      return console.log(arr);
    };
  });

}).call(this);

//# sourceMappingURL=search-text.js.map
