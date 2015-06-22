(function() {
  'use strict';
  describe('Filter: searchText', function() {
    var searchText;
    beforeEach(module('testApp'));
    searchText = {};
    beforeEach(inject(function($filter) {
      return searchText = $filter('searchText');
    }));
    return it('should return the input prefixed with "searchText filter:"', function() {
      var text;
      text = 'angularjs';
      return expect(searchText(text)).toBe('searchText filter: ' + text);
    });
  });

}).call(this);

//# sourceMappingURL=search-text.js.map
