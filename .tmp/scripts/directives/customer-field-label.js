(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:editCustomersLabel
    * @description
    * # editCustomersLabel
   */
  angular.module('testApp').directive('customerFieldLabel', function() {
    return {
      restrict: 'E',
      scope: {
        fieldName: '@'
      },
      template: '{{label}}',
      link: function($scope, elem) {
        var labels;
        labels = {
          firstName: 'First name',
          lastName: 'Last name',
          email: 'Email',
          age: 'Age'
        };
        return $scope.label = labels[$scope.fieldName];
      }
    };
  });

}).call(this);

//# sourceMappingURL=customer-field-label.js.map
