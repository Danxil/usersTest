(function() {
  'use strict';
  describe('Controller: ConfirmationDeleteCtrlCtrl', function() {
    var ConfirmationDeleteCtrlCtrl, scope;
    beforeEach(module('testApp'));
    ConfirmationDeleteCtrlCtrl = {};
    scope = {};
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      return ConfirmationDeleteCtrlCtrl = $controller('ConfirmationDeleteCtrlCtrl', {
        $scope: scope
      });
    }));
    return it('should attach a list of awesomeThings to the scope', function() {
      return expect(scope.awesomeThings.length).toBe(3);
    });
  });

}).call(this);

//# sourceMappingURL=confirmation-delete-.js.map
