'use strict'

describe 'Directive: fieldValidation', ->

  # load the directive's module
  beforeEach module 'testApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<field-validation></field-validation>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the fieldValidation directive'
