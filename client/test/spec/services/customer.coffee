'use strict'

describe 'Service: Customer', ->

  # load the service's module
  beforeEach module 'testApp'

  # instantiate service
  Customer = {}
  beforeEach inject (_Customer_) ->
    Customer = _Customer_

  it 'should do something', ->
    expect(!!Customer).toBe true
