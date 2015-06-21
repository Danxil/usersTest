'use strict'

###*
 # @ngdoc filter
 # @name testApp.filter:searchText
 # @function
 # @description
 # # searchText
 # Filter in the testApp.
###
angular.module 'testApp'
  .filter 'searchText', ()->
    (text, arr) ->
      console.log text
      console.log arr