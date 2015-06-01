'use strict'

describe 'Controller: CreateCustomerCtrl', ->

  # load the controller's module
  beforeEach module 'testApp'

  CreateCustomerCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    CreateCustomerCtrl = $controller 'CreateCustomerCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
