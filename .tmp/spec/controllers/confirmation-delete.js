(function() {
  'use strict';
  describe('Controller: ConfirmationDeleteCtrl', function() {
    var ConfirmationDeleteCtrl, scope;
    beforeEach(module('testApp'));
    ConfirmationDeleteCtrl = {};
    scope = {};
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      return ConfirmationDeleteCtrl = $controller('ConfirmationDeleteCtrl', {
        $scope: scope
      });
    }));
    return it('should attach a list of awesomeThings to the scope', function() {
      return expect(scope.awesomeThings.length).toBe(3);
    });
  });

}).call(this);

//# sourceMappingURL=confirmation-delete.js.map
