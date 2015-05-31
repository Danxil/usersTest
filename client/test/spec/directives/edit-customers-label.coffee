'use strict'

describe 'Directive: editCustomersLabel', ->

  # load the directive's module
  beforeEach module 'testApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<edit-customers-label></edit-customers-label>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the editCustomersLabel directive'
