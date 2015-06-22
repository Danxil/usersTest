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
  angular.module('testApp').filter('filterByText', function() {
    return function(input, text, ageFrom, ageTo, callback) {
      var output;
      if (!text && !ageFrom && !ageTo) {
        if (callback) {
          callback(input);
        }
        return input;
      }
      if (text && text.toLowerCase) {
        text = text.toLowerCase();
      }
      ageFrom = parseInt(ageFrom);
      ageTo = parseInt(ageTo);
      output = _.filter(input, function(item) {
        var currentAge, field, key, success;
        success = false;
        currentAge = parseInt(item.age);
        for (key in item) {
          field = item[key];
          if (key === '$$hashKey' || key === 'id') {
            continue;
          }
          if (field.toLowerCase) {
            field = field.toLowerCase();
          }
          success = (field.indexOf(text) !== -1 || !text) && (currentAge >= ageFrom || !ageFrom) && (currentAge <= ageTo || !ageTo);
          if (success) {
            break;
          }
        }
        return success;
      });
      if (callback) {
        callback(output);
      }
      return output;
    };
  });

}).call(this);

//# sourceMappingURL=filter-by-text.js.map
