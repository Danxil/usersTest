(function() {
  'use strict';
  describe('Controller: ConfirmationdeletectrlCtrl', function() {
    var ConfirmationdeletectrlCtrl, scope;
    beforeEach(module('testApp'));
    ConfirmationdeletectrlCtrl = {};
    scope = {};
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      return ConfirmationdeletectrlCtrl = $controller('ConfirmationdeletectrlCtrl', {
        $scope: scope
      });
    }));
    return it('should attach a list of awesomeThings to the scope', function() {
      return expect(scope.awesomeThings.length).toBe(3);
    });
  });

}).call(this);

//# sourceMappingURL=confirmationdelete.js.map
