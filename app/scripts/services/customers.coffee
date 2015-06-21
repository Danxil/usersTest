'use strict'

###*
 # @ngdoc service
 # @name testApp.Customer
 # @description
 # # Customer
 # Factory in the testApp.
###
angular.module('testApp')
  .factory 'Customers', ($resource)->
    $resource 'storage/customers/:id', id: '@id',
      create:
        method: 'POST'
      update:
        method: 'PUT'
      get:
        method: 'GET'
      delete:
        method: 'DELETE'
