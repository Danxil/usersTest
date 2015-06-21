'use strict'

describe 'Filter: searchText', ->

  # load the filter's module
  beforeEach module 'testApp'

  # initialize a new instance of the filter before each test
  searchText = {}
  beforeEach inject ($filter) ->
    searchText = $filter 'searchText'

  it 'should return the input prefixed with "searchText filter:"', ->
    text = 'angularjs'
    expect(searchText text).toBe ('searchText filter: ' + text)
