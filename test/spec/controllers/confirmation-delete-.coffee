'use strict'

describe 'Controller: ConfirmationDeleteCtrlCtrl', ->

  # load the controller's module
  beforeEach module 'testApp'

  ConfirmationDeleteCtrlCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ConfirmationDeleteCtrlCtrl = $controller 'ConfirmationDeleteCtrlCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
