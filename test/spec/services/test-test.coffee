'use strict'

describe 'Service: testTest', ->

  # load the service's module
  beforeEach module 'testApp'

  # instantiate service
  testTest = {}
  beforeEach inject (_testTest_) ->
    testTest = _testTest_

  it 'should do something', ->
    expect(!!testTest).toBe true
