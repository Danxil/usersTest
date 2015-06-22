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
