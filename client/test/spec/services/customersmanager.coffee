'use strict'

describe 'Service: customersManager', ->

  # load the service's module
  beforeEach module 'testApp'

  # instantiate service
  customersManager = {}
  beforeEach inject (_customersManager_) ->
    customersManager = _customersManager_

  it 'should do something', ->
    expect(!!customersManager).toBe true
