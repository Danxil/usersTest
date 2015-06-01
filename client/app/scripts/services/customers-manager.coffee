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

      _fetchedAll: false

      _retrieveInstance: (customerData) ->
        @_pool[customerData.id] = if customerData.toJSON then customerData.toJSON() else customerData

      _deleteInstance: (customerData) ->
        delete @_pool[customerData.id]

      fetchCustomers: (id, callback, errorCallback)->
        deferred = $q.defer()
        scope = this

        isId = id and typeof id != 'function'

        Customers[if isId then 'get' else 'query'] {id: id}, (response)->
          customers = []

          if response.forEach
            response.forEach (customerData) ->
              customer = scope._retrieveInstance(customerData)
              customers.push customer

            scope._fetchedAll = true
            deferred.resolve customers

            if callback then callback(customers)
          else
            customer = scope._retrieveInstance(response)
            deferred.resolve customer
            if callback then callback(customer)

        , (error)->
          deferred.reject()
          if errorCallback then errorCallback(error)

        deferred.promise

      getOrFetchCustomers: (id, callback, errorCallback)->
        deferred = $q.defer()

        isId = id and typeof id != 'function'

        exist = if isId then @_pool[id] else (if @_fetchedAll then @_pool else undefined)

        if exist
          deferred.resolve exist
          if callback then callback(exist)
        else
          $q.when @fetchCustomers(id, callback, errorCallback), (response)->
            deferred.resolve response
          , (error)->
            deferred.reject()

        deferred.promise

      getCustomers: (id)->
        if id then @_pool[id] else @_pool

      createCustomer: (customerData, callback, errorCallback) ->
        deferred = $q.defer()
        scope = this

        Customers.create customerData, (response)->
          #server must be return created object with a generated ID
          customer = scope._retrieveInstance(response)
          deferred.resolve customer
          if callback then callback(customer)
        , (error)->
          deferred.reject()
          if errorCallback then errorCallback(error)

        deferred.promise

      updateCustomer: (customerData, callback, errorCallback) ->
        deferred = $q.defer()
        scope = this

        Customers.update customerData, ->
          customer = scope._retrieveInstance(customerData)
          deferred.resolve customer
          if callback then callback(customer)
        , (error)->
          deferred.reject()
          if errorCallback then errorCallback(error)

        deferred.promise

      deleteCustomer: (customerData, callback, errorCallback) ->
        deferred = $q.defer()
        scope = this

        customerData = id: customerData.id

        Customers.delete customerData, ->
          customer = scope._deleteInstance(customerData)
          deferred.resolve customer
          if callback then callback(customer)
        , (error)->
          deferred.reject()
          if errorCallback then errorCallback(error)

        deferred.promise

    customersManager
  ]
