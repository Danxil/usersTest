(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name testApp.controller:HomeCtrl
    * @description
    * # HomeCtrl
    * Controller of the testApp
   */
  angular.module('testApp').controller('HomeCtrl', function(customersData, $scope, customersManager, $rootScope, $modal, $routeParams, $filter) {
    $scope.customersObj = customersData;
    $scope.customersAll = _.values($scope.customersObj);
    $scope.selectedCustomers = [];
    $scope.pageChanged = function() {
      var start;
      start = $scope.itemsPerPage * ($scope.currentPage - 1);
      return $scope.customers = $scope.customersAll.slice(start, start + $scope.itemsPerPage);
    };
    $scope.$watchCollection('customersObj', function() {
      $scope.customersAll = _.values($scope.customersObj);
      $scope.totalItems = $scope.customersAll.length;
      $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
      return $scope.pageChanged();
    });
    $scope.totalItems = $scope.customersAll.length;
    $scope.itemsPerPage = 8;
    $scope.currentPage = $routeParams.currentPage || 1;
    $scope.infCurrentPage = $scope.currentPage;
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
        return $scope.selectedCustomers = [];
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
    $scope.toggleSelectCustomer = function(customer) {
      var index;
      index = $scope.selectedCustomers.indexOf(customer);
      if (index !== -1) {
        return $scope.selectedCustomers.splice(index, 1);
      } else {
        return $scope.selectedCustomers.push(customer);
      }
    };
    $scope.togglePagination = function() {
      if ($scope.paginatorEnabled) {
        $scope.infCurrentPage = $scope.currentPage;
        return $scope.paginatorEnabled = false;
      } else {
        $scope.currentPage = $scope.infCurrentPage;
        $scope.pageChanged();
        return $scope.paginatorEnabled = true;
      }
    };
    $scope.infScrollCtrl = {
      calcFn: function() {
        if ($scope.infCurrentPage > $scope.totalPages) {
          return;
        }
        return $scope.customers = $scope.customersAll.slice(0, $scope.itemsPerPage * $scope.infCurrentPage);
      },
      onScroll: function() {
        if ($scope.infCurrentPage + 1 > $scope.totalPages) {
          return;
        }
        $scope.infCurrentPage++;
        return this.calcFn();
      },
      onEnabled: function() {
        return this.calcFn();
      }
    };
    return $scope.fiterSearch = function(val) {
      return $filter('searchText')($scope.searchText, $scope.customersAll);
    };
  });

}).call(this);

//# sourceMappingURL=home.js.map
