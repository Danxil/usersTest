(function() {
  'use strict';

  /**
    * @ngdoc overview
    * @name testApp
    * @description
    * # testApp
    *
    * Main module of the application.
   */
  var app;

  app = angular.module('testApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap']);

  app.config(function($routeProvider) {
    return $routeProvider.when('/home/:page?/:currentPage?', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      resolve: {
        customersData: function($q, customersManager, $rootScope, $timeout) {
          var deferred;
          $rootScope.setOverlay(true);
          deferred = $q.defer();
          $q.when(customersManager.getOrFetchCustomers(), function(data) {
            return $timeout(function() {
              $rootScope.setOverlay(false);
              return deferred.resolve(data);
            }, 1000);
          });
          return deferred.promise;
        }
      }
    }).when('/edit-customer/:id', {
      templateUrl: 'views/edit-customer.html',
      controller: 'EditCustomerCtrl',
      resolve: {
        customerData: function($q, customersManager, $route) {
          var deferred;
          deferred = $q.defer();
          customersManager.getOrFetchCustomers($route.current.params.id, function(data) {
            return deferred.resolve(data);
          });
          return deferred.promise;
        }
      }
    }).otherwise({
      redirectTo: '/home'
    });
  });

}).call(this);

//# sourceMappingURL=app.js.map

(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:HomeCtrl
    * @description
    * # HomeCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('HomeCtrl', function(customersData, $scope, customersManager, $rootScope, $modal, $routeParams) {
    $scope.customersObj = customersData;
    $scope.customers = _.values($scope.customersObj);
    $scope.selectedCustomers = [];
    $scope.filter = {
      orderBy: {
        set: function(field) {
          $scope.filter.orderBy.reverse = $scope.filter.orderBy.field === field ? !$scope.filter.orderBy.reverse : false;
          return $scope.filter.orderBy.field = field;
        },
        field: 'firstName',
        reverse: false
      }
    };
    $scope.pagination = {
      calcAfterFilter: function(array) {
        return (function() {
          this.totalItems = array.length;
          return this.totalPages = Math.ceil($scope.pagination.totalItems / $scope.pagination.itemsPerPage);
        }).call($scope.pagination);
      },
      calcPagination: function() {
        this.totalItems = $scope.customers.length;
        this.startShowItems = this.itemsPerPage * (this.currentPage - 1);
        return this.endShowItems = this.startShowItems + this.itemsPerPage;
      },
      togglePagination: function() {
        if (this.paginatorEnabled) {
          $scope.pagination.infCurrentPage = $scope.pagination.currentPage;
          return this.paginatorEnabled = false;
        } else {
          $scope.pagination.currentPage = $scope.pagination.infCurrentPage;
          $scope.pagination.calcPagination();
          return this.paginatorEnabled = true;
        }
      },
      paginatorEnabled: false,
      totalItems: $scope.customers.length,
      itemsPerPage: 8,
      currentPage: $routeParams.currentPage || 1,
      infCurrentPage: $routeParams.currentPage || 1,
      infScrollCtrl: {
        calcFn: function() {
          if ($scope.pagination.infCurrentPage > $scope.pagination.totalPages) {
            return;
          }
          $scope.pagination.startShowItems = 0;
          return $scope.pagination.endShowItems = $scope.pagination.itemsPerPage * $scope.pagination.infCurrentPage;
        },
        onScroll: function() {
          if ($scope.pagination.infCurrentPage + 1 > $scope.pagination.totalPages) {
            return;
          }
          $scope.pagination.infCurrentPage++;
          return this.calcFn();
        },
        onEnabled: function() {
          return this.calcFn();
        }
      }
    };
    $scope.$watchCollection('customersObj', function() {
      $scope.customers = _.values($scope.customersObj);
      $scope.pagination.totalItems = $scope.customers.length;
      $scope.pagination.totalPages = Math.ceil($scope.pagination.totalItems / $scope.pagination.itemsPerPage);
      return $scope.pagination.calcPagination();
    });
    $scope.deleteConfirmation = function(customer) {
      var confirmationDeleteModal;
      if (customer) {
        $scope.selectedCustomers = [$scope.customersObj[customer.id]];
      }
      confirmationDeleteModal = $modal.open({
        templateUrl: 'views/modals/confirmation-delete.html',
        controller: 'ConfirmationDeleteCtrl',
        resolve: {
          selectedCustomers: function() {
            return $scope.selectedCustomers;
          }
        }
      });
      return confirmationDeleteModal.result.then(function() {
        $scope.selectedCustomers = [];
        return $scope.pagination.calcPagination();
      }, function() {
        return $scope.selectedCustomers = [];
      });
    };
    $scope.editCustomer = function(customer) {
      var editCustomerModal;
      $scope.selectedCustomers = [$scope.customersObj[customer.id]];
      editCustomerModal = $modal.open({
        templateUrl: 'views/modals/edit-customer.html',
        controller: 'EditCustomerModalCtrl',
        resolve: {
          customerData: function() {
            return $scope.selectedCustomers[0];
          }
        }
      });
      return editCustomerModal.result.then(function() {
        return $scope.selectedCustomers = [];
      }, function() {
        return $scope.selectedCustomers = [];
      });
    };
    return $scope.toggleSelectCustomer = function(customer) {
      var index;
      index = $scope.selectedCustomers.indexOf(customer);
      if (index !== -1) {
        return $scope.selectedCustomers.splice(index, 1);
      } else {
        return $scope.selectedCustomers.push(customer);
      }
    };
  });

}).call(this);

//# sourceMappingURL=home.js.map

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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
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
          email: 'natasha@gmail.com',
          age: '55'
        },
        33: {
          id: 33,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '21'
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
          email: 'natasha@gmail.com',
          age: '55'
        },
        36: {
          id: 36,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '20'
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
          firstName: 'BNatasha',
          lastName: 'Aleksandrova',
          email: 'natasha@gmail.com',
          age: '55'
        },
        39: {
          id: 39,
          firstName: 'Vasia',
          lastName: 'AVasiliev',
          email: 'vasia@gmail.com',
          age: '22'
        },
        40: {
          id: 40,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'bpetya@gmail.com',
          age: '33'
        },
        41: {
          id: 41,
          firstName: 'ANatasha',
          lastName: 'Aleksandrova',
          email: 'natasha@gmail.com',
          age: '55'
        },
        42: {
          id: 42,
          firstName: 'Vasia',
          lastName: 'BVasiliev',
          email: 'vasia@gmail.com',
          age: '24'
        },
        43: {
          id: 43,
          firstName: 'Petya',
          lastName: 'Petrov',
          email: 'apetya@gmail.com',
          age: '33'
        },
        44: {
          id: 44,
          firstName: 'Natasha',
          lastName: 'Aleksandrova',
          email: 'natasha@gmail.com',
          age: '55'
        },
        45: {
          id: 45,
          firstName: 'Vasia',
          lastName: 'Vasiliev',
          email: 'vasia@gmail.com',
          age: '23'
        }
      };
      return customersManager;
    }
  ]);

}).call(this);

//# sourceMappingURL=customers-manager.js.map

(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name testApp.Customer
    * @description
    * # Customer
    * Factory in the testApp.
   */
  angular.module('testApp').factory('Customers', function($resource) {
    return $resource('storage/customers/:id', {
      id: '@id'
    }, {
      create: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET'
      },
      "delete": {
        method: 'DELETE'
      }
    });
  });

}).call(this);

//# sourceMappingURL=customers.js.map

(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:EditCustomerCtrl
    * @description
    * # EditCustomerCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('EditCustomerCtrl', function(customerData, $scope, $rootScope, customersManager, $location, $timeout) {
    var defaultCustomer, filterUpdatedFieldsFn, wasUpdatedFn;
    filterUpdatedFieldsFn = function(viewCustomer, defaultCustomer) {
      viewCustomer = angular.copy(viewCustomer);
      _.each(viewCustomer, function(item, key) {
        if (key === 'id') {
          return;
        }
        if (item === defaultCustomer[key]) {
          return delete viewCustomer[key];
        }
      });
      return viewCustomer;
    };
    wasUpdatedFn = function(sendCustomer, defaultCustomer) {
      var filteredFields;
      filteredFields = filterUpdatedFieldsFn($scope.viewCustomer, defaultCustomer);
      delete filteredFields['id'];
      return !_.isEmpty(filteredFields);
    };
    defaultCustomer = angular.copy(customerData);
    $scope.viewCustomer = angular.copy(customerData);
    $scope.$watchCollection('viewCustomer', function() {
      return $timeout(function() {
        return $scope.wasUpdated = wasUpdatedFn($scope.viewCustomer, defaultCustomer);
      });
    });
    return $scope.submit = function() {
      $rootScope.setOverlay(true);
      return customersManager.updateCustomer($scope.viewCustomer, function() {
        return $rootScope.setOverlay(false, function() {
          return $location.path('/home');
        });
      });
    };
  });

}).call(this);

//# sourceMappingURL=edit-customer.js.map

(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:EditCustomerCtrl
    * @description
    * # EditCustomerCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('EditCustomerModalCtrl', function(customerData, $scope, $rootScope, customersManager, $location, $timeout, $controller, $modalInstance) {
    angular.extend(this, $controller('EditCustomerCtrl', {
      $scope: $scope,
      customerData: customerData
    }));
    $scope.submit = function() {
      $rootScope.setOverlay(true);
      return customersManager.updateCustomer($scope.viewCustomer, function() {
        return $rootScope.setOverlay(false, function() {
          return $modalInstance.close();
        });
      });
    };
    return $scope.cancel = function() {
      return $modalInstance.close();
    };
  });

}).call(this);

//# sourceMappingURL=edit-customer-modal.js.map

(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:editCustomersLabel
    * @description
    * # editCustomersLabel
   */
  angular.module('testApp').directive('customerFieldLabel', function() {
    return {
      restrict: 'E',
      scope: {
        fieldName: '@'
      },
      template: '{{label}}',
      link: function($scope, elem) {
        var labels;
        labels = {
          firstName: 'First name',
          lastName: 'Last name',
          email: 'Email',
          age: 'Age'
        };
        return $scope.label = labels[$scope.fieldName];
      }
    };
  });

}).call(this);

//# sourceMappingURL=customer-field-label.js.map

(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:fieldValidation
    * @description
    * # fieldValidation
   */
  angular.module('testApp').directive('customerFieldValidation', function($compile) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        var errorBlock, fields;
        fields = {
          firstName: {
            required: true,
            pattern: {
              reg: '/^[a-zA-Z]+$/',
              errorMessage: 'Enter correct first name. For example: Oleg'
            }
          },
          lastName: {
            required: true,
            pattern: {
              reg: '/^[a-zA-Z]+$/',
              errorMessage: 'Enter correct last name. For example: Olegovich'
            }
          },
          email: {
            required: true,
            pattern: {
              reg: '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/',
              errorMessage: 'Enter correct email. For example: test@example.com'
            }
          },
          age: {
            required: true,
            pattern: {
              reg: '/^[0-9]{1,2}$/',
              errorMessage: 'Enter correct age. For example: 32'
            }
          }
        };
        if (!attrs['customerFieldValidation']) {
          return false;
        }
        if (fields[attrs['customerFieldValidation']].required) {
          elem.attr('required', true);
        }
        elem.attr('ng-pattern', fields[attrs.customerFieldValidation].pattern.reg);
        errorBlock = $('<div class="error-block"></div>');
        errorBlock.append('<p class="input-error required">This field is required</p>');
        errorBlock.append('<p class="input-error pattern">' + fields[attrs.customerFieldValidation].pattern.errorMessage + '</p>');
        errorBlock.insertAfter(elem);
        $compile(errorBlock)($scope);
        elem.removeAttr('data-customer-field-validation');
        return $compile(elem)($scope);
      }
    };
  });

}).call(this);

//# sourceMappingURL=customer-field-validation.js.map

(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:overlay
    * @description
    * # overlay
   */
  angular.module('testApp').directive('overlay', function($rootScope) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        return $rootScope.setOverlay = function(value, callback) {
          if (value) {
            elem.css('display', 'block');
            return elem.animate({
              opacity: 1
            }, 'fast', function() {
              if (callback) {
                callback();
              }
              return $scope.$apply();
            });
          } else {
            return elem.animate({
              opacity: 0
            }, 'fast', function() {
              elem.css('display', 'none');
              if (callback) {
                callback();
              }
              return $scope.$apply();
            });
          }
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=overlay.js.map

(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:overlay
    * @description
    * # overlay
   */
  angular.module('testApp').directive('customerLocation', function($rootScope, $location) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        return elem.click(function(e) {
          if ($(e.target).hasClass('btn')) {
            return;
          }
          return $scope.$apply(function() {
            return $location.url(attrs.customerLocation);
          });
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=customer-location.js.map

(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name testApp.directive:overlay
    * @description
    * # overlay
   */
  angular.module('testApp').directive('infiniteScroll', function($rootScope, $timeout) {
    return {
      scope: {
        infScrollCtrl: '=infiniteScroll',
        infDisabled: '='
      },
      restrict: 'A',
      link: function($scope, elem, attrs) {
        $(window).scroll(function() {
          if ($scope.infDisabled) {
            return;
          }
          if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            if ($scope.infScrollCtrl.onScroll) {
              $scope.infScrollCtrl.onScroll();
            }
            return $scope.$apply();
          }
        });
        $scope.$watch('infDisabled', function(val) {
          if (!val) {
            if ($scope.infScrollCtrl.onEnabled) {
              return $scope.infScrollCtrl.onEnabled();
            }
          }
        });
        if ($scope.infScrollCtrl.onInit) {
          return $scope.infScrollCtrl.onInit();
        }
      }
    };
  });

}).call(this);

//# sourceMappingURL=infinite-scroll.js.map

(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:ConfirmationDeleteCtrl
    * @description
    * # ConfirmationDeleteCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('ConfirmationDeleteCtrl', function($scope, $modalInstance, selectedCustomers, $rootScope, customersManager) {
    $scope.selectedCustomers = selectedCustomers;
    $scope["delete"] = function() {
      $rootScope.setOverlay(true);
      return customersManager.deleteCustomers($scope.selectedCustomers, function() {
        $rootScope.setOverlay(false);
        return $modalInstance.close();
      });
    };
    return $scope.cancel = function() {
      return $modalInstance.close();
    };
  });

}).call(this);

//# sourceMappingURL=confirmation-delete-modal.js.map

(function() {
  'use strict';

  /**
    * @ngdoc filter
    * @name testApp.filter:searchText
    * @function
    * @description
    * # searchText
    * Filter in the testApp.
   */
  angular.module('testApp').filter('filterByText', function() {
    return function(input, text, ageFrom, ageTo, callback) {
      var output;
      if (!text && !ageFrom && !ageTo) {
        if (callback) {
          callback(input);
        }
        return input;
      }
      if (text && text.toLowerCase) {
        text = text.toLowerCase();
      }
      ageFrom = parseInt(ageFrom);
      ageTo = parseInt(ageTo);
      output = _.filter(input, function(item) {
        var currentAge, field, key, success;
        success = false;
        currentAge = parseInt(item.age);
        for (key in item) {
          field = item[key];
          if (key === '$$hashKey' || key === 'id') {
            continue;
          }
          if (field.toLowerCase) {
            field = field.toLowerCase();
          }
          success = (field.indexOf(text) !== -1 || !text) && (currentAge >= ageFrom || !ageFrom) && (currentAge <= ageTo || !ageTo);
          if (success) {
            break;
          }
        }
        return success;
      });
      if (callback) {
        callback(output);
      }
      return output;
    };
  });

}).call(this);

//# sourceMappingURL=filter-by-text.js.map
