'use strict'

describe 'Controller: ConfirmationDeleteCtrl', ->

  # load the controller's module
  beforeEach module 'testApp'

  ConfirmationDeleteCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ConfirmationDeleteCtrl = $controller 'ConfirmationDeleteCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
