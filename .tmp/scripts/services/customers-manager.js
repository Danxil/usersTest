(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name testApp.customersManager
    * @description
    * # customersManager
    * Factory in the testApp.
   */
  angular.module('testApp').factory('customersManager', [
    '$http', '$q', 'Customers', function($http, $q, Customers) {
      var customersManager;
      customersManager = {
        _pool: {},
        _fetchedAll: false,
        _retrieveInstance: function(customerData) {
          return this._pool[customerData.id] = customerData.toJSON ? customerData.toJSON() : customerData;
        },
        _deleteInstance: function(customerData) {
          return delete this._pool[customerData.id];
        },
        fetchCustomers: function(id, callback, errorCallback) {
          var deferred, isId, scope;
          deferred = $q.defer();
          scope = this;
          isId = id && typeof id !== 'function';
          Customers[isId ? 'get' : 'query']({
            id: id
          }, function(response) {
            var customer, customers;
            customers = [];
            if (response.forEach) {
              response.forEach(function(customerData) {
                var customer;
                customer = scope._retrieveInstance(customerData);
                return customers.push(customer);
              });
              scope._fetchedAll = true;
              deferred.resolve(customers);
              if (callback) {
                return callback(customers);
              }
            } else {
              customer = scope._retrieveInstance(response);
              deferred.resolve(customer);
              if (callback) {
                return callback(customer);
              }
            }
          }, function(error) {
            deferred.reject();
            if (errorCallback) {
              return errorCallback(error);
            }
          });
          return deferred.promise;
        },
        getOrFetchCustomers: function(id, callback, errorCallback) {
          var deferred, exist, isId;
          deferred = $q.defer();
          isId = id && typeof id !== 'function';
          exist = isId ? this._pool[id] : (this._fetchedAll ? this._pool : void 0);
          if (exist) {
            deferred.resolve(exist);
            if (callback) {
              callback(exist);
            }
          } else {
            $q.when(this.fetchCustomers(id, callback, errorCallback), function(response) {
              return deferred.resolve(response);
            }, function(error) {
              return deferred.reject();
            });
          }
          return deferred.promise;
        },
        getCustomers: function(id) {
          if (id) {
            return this._pool[id];
          } else {
            return this._pool;
          }
        },
        createCustomer: function(customerData, callback, errorCallback) {
          var deferred, scope;
          deferred = $q.defer();
          scope = this;
          Customers.create(customerData, function(response) {
            var customer;
            customer = scope._retrieveInstance(response);
            deferred.resolve(customer);
            if (callback) {
              return callback(customer);
            }
          }, function(error) {
            deferred.reject();
            if (errorCallback) {
              return errorCallback(error);
            }
          });
          return deferred.promise;
        },
        updateCustomer: function(customerData, callback, errorCallback) {
          var customer, deferred, scope;
          deferred = $q.defer();
          scope = this;

          /*
          Customers.update customerData, ->
            customer = scope._retrieveInstance(customerData)
            deferred.resolve customer
            if callback then callback(customer)
          , (error)->
            deferred.reject()
            if errorCallback then errorCallback(error)
           */
          customer = scope._retrieveInstance(customerData);
          deferred.resolve(customer);
          if (callback) {
            callback(customer);
          }
          return deferred.promise;
        },
        deleteCustomers: function(customersData, callback, errorCallback) {
          var customers, deferred, scope;
          deferred = $q.defer();
          scope = this;

          /*
          Customers.delete customerData, ->
            customer = scope._deleteInstance(customerData)
            deferred.resolve customer
            if callback then callback(customer)
          , (error)->
            deferred.reject()
            if errorCallback then errorCallback(error)
           */
          if (!_.isArray(customersData)) {
            customersData = [customersData];
          }
          customers = [];
          _.each(customersData, function(customerData) {
            customerData = {
              id: customerData.id
            };
            return customers.push(scope._deleteInstance(customerData));
          });
          deferred.resolve(customersData);
          if (callback) {
            callback(customers);
          }
          return deferred.promise;
        }
      };
      customersManager._fetchedAll = true;
      customersManager._pool = {
        0: {
          id: 0,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        1: {
          id: 1,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        2: {
          id: 2,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        3: {
          id: 3,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        4: {
          id: 4,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        5: {
          id: 5,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        6: {
          id: 6,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        7: {
          id: 7,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        8: {
          id: 8,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        9: {
          id: 9,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        10: {
          id: 10,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        11: {
          id: 11,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        12: {
          id: 12,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        13: {
          id: 13,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        14: {
          id: 14,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        15: {
          id: 15,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        16: {
          id: 16,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        17: {
          id: 17,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        18: {
          id: 18,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        19: {
          id: 19,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        20: {
          id: 20,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        21: {
          id: 21,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        22: {
          id: 22,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        23: {
          id: 23,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        24: {
          id: 24,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        25: {
          id: 25,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        26: {
          id: 26,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        27: {
          id: 27,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        28: {
          id: 28,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        29: {
          id: 29,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        30: {
          id: 30,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        31: {
          id: 31,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        32: {
          id: 32,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        33: {
          id: 33,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        34: {
          id: 34,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        35: {
          id: 35,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        36: {
          id: 36,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        37: {
          id: 37,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        38: {
          id: 38,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        39: {
          id: 39,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        40: {
          id: 40,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        41: {
          id: 41,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        42: {
          id: 42,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        43: {
          id: 43,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'petya@gmail.com',
          age: '33'
        },
        44: {
          id: 44,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'Natasha@gmail.com',
          age: '55'
        },
        45: {
          id: 45,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        }
      };
      return customersManager;
    }
  ]);

}).call(this);

//# sourceMappingURL=customers-manager.js.map
