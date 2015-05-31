'use strict'

###*
 # @ngdoc service
 # @name testApp.customersManager
 # @description
 # # customersManager
 # Factory in the testApp.
###
angular.module('testApp')
  .factory 'customersManager', ['$http', '$q', 'Customers',
  ($http, $q, Customers)->

    customersManager =
      _pool: {}

      _retrieveInstance: (customerData) ->
        instance = @_pool[customerData.id]

        if instance
          instance = customerData
        else
          instance = new Customers(customerData)
          @_pool[customerData.id] = instance

        instance

      fetchCustomers: (id)->
        deferred = $q.defer()
        scope = this

        Customers[if id then 'get' else 'query'] {id: id}, (response)->
          customers = []

          if response.forEach
            response.forEach (customerData) ->
              customer = scope._retrieveInstance(customerData)
              customers.push customer

            deferred.resolve customers
          else
            customer = scope._retrieveInstance(response)
            deferred.resolve customer

        deferred.promise

      getCustomers: (id)->
        if id then @_pool[id] else @_pool

      getOrFetchCustomers: (id)->
        deferred = $q.defer()

        exist = if id then @_pool[id] else (if !_.isEmpty @_pool then @_pool else undefined)

        if exist
          deferred.resolve exist
        else
          $q.when @fetchCustomers(id), (response)->
            deferred.resolve response

        deferred.promise

      createCustomer: (customerData) ->
        deferred = $q.defer()
        scope = this

        Customers.create customerData, ->
          customer = scope._retrieveInstance(customerData)
          deferred.resolve customer

        deferred.promise

    customersManager
  ]
