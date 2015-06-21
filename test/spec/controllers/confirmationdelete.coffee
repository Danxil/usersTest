'use strict'

describe 'Controller: ConfirmationdeletectrlCtrl', ->

  # load the controller's module
  beforeEach module 'testApp'

  ConfirmationdeletectrlCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ConfirmationdeletectrlCtrl = $controller 'ConfirmationdeletectrlCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
