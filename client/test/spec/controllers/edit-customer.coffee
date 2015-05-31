'use strict'

describe 'Controller: EditCustomerCtrl', ->

  # load the controller's module
  beforeEach module 'testApp'

  EditCustomerCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    EditCustomerCtrl = $controller 'EditCustomerCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
