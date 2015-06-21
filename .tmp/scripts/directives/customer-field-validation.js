(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:fieldValidation
    * @description
    * # fieldValidation
   */
  angular.module('testApp').directive('customerFieldValidation', function($compile) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        var errorBlock, fields;
        fields = {
          firstName: {
            required: true,
            pattern: {
              reg: '/^[a-zA-Z]+$/',
              errorMessage: 'Enter correct first name. For example: Oleg'
            }
          },
          lastName: {
            required: true,
            pattern: {
              reg: '/^[a-zA-Z]+$/',
              errorMessage: 'Enter correct last name. For example: Olegovich'
            }
          },
          email: {
            required: true,
            pattern: {
              reg: '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/',
              errorMessage: 'Enter correct email. For example: test@example.com'
            }
          },
          age: {
            required: true,
            pattern: {
              reg: '/^[0-9]{1,2}$/',
              errorMessage: 'Enter correct age. For example: 32'
            }
          }
        };
        if (!attrs['customerFieldValidation']) {
          return false;
        }
        if (fields[attrs['customerFieldValidation']].required) {
          elem.attr('required', true);
        }
        elem.attr('ng-pattern', fields[attrs.customerFieldValidation].pattern.reg);
        errorBlock = $('<div class="error-block"></div>');
        errorBlock.append('<p class="input-error required">This field is required</p>');
        errorBlock.append('<p class="input-error pattern">' + fields[attrs.customerFieldValidation].pattern.errorMessage + '</p>');
        errorBlock.insertAfter(elem);
        $compile(errorBlock)($scope);
        elem.removeAttr('data-customer-field-validation');
        return $compile(elem)($scope);
      }
    };
  });

}).call(this);

//# sourceMappingURL=customer-field-validation.js.map
