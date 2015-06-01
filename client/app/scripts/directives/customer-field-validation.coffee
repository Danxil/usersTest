'use strict'

###*
 # @ngdoc directive
 # @name testApp.directive:fieldValidation
 # @description
 # # fieldValidation
###
angular.module('testApp')
  .directive('customerFieldValidation', ($compile)->
    restrict: 'A'
    link: ($scope, elem, attrs) ->
      fields =
        name:
          required: true
          pattern:
            reg: '/^[a-zA-Z]+$/'
            errorMessage: 'Enter correct name. For example: Oleg'
        email:
          required: true
          pattern:
            reg: '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/'
            errorMessage: 'Enter correct email. For example: test@example.com'
        telephone:
          required: true
          pattern:
            reg: '/^[0-9]{2}\-[0-9]{2}\-[0-9]{2}$/'
            errorMessage: 'Enter correct telephone. For example: 11-22-33'
        address:
          pattern:
            reg: '/^[0-9]{1,5}$/'
            errorMessage: 'Enter correct address. For example: 206'
        street:
          pattern:
            reg: ''
            errorMessage: ''
        city:
          pattern:
            reg: ''
            errorMessage: ''
        state:
          pattern:
            reg: ''
            errorMessage: ''
        zip:
          pattern:
            reg: '/^[0-9]{3,7}$/'
            errorMessage: 'Enter correct zip. For example: 84087'

      if fields[$scope.fieldName].required
        elem.attr 'required', true

      elem.attr 'ng-pattern', fields[attrs.customerFieldValidation].pattern.reg

      errorBlock = $('<div class="error-block"></div>')

      errorBlock.append('<p class="input-error required">This field is required</p>')
      errorBlock.append('<p class="input-error pattern">' + fields[attrs.customerFieldValidation].pattern.errorMessage + '</p>')

      errorBlock.insertAfter elem

      $compile(errorBlock)($scope)

      elem.removeAttr('data-customer-field-validation')

      $compile(elem)($scope)
  )
