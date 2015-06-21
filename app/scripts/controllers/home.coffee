'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:HomeCtrl
 # @description
 # # HomeCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'HomeCtrl', (customersData, $scope, customersManager, $rootScope, $modal, $routeParams, $filter) ->
    $scope.customersObj = customersData
    $scope.customersAll = _.values $scope.customersObj
    $scope.selectedCustomers = []

    $scope.pageChanged = ->
      start = $scope.itemsPerPage * ($scope.currentPage - 1)
      $scope.customers = $scope.customersAll.slice start, start + $scope.itemsPerPage

    $scope.$watchCollection 'customersObj',  ->
      $scope.customersAll = _.values $scope.customersObj
      $scope.totalItems = $scope.customersAll.length
      $scope.totalPages = Math.ceil $scope.totalItems / $scope.itemsPerPage
      $scope.pageChanged()

    $scope.totalItems = $scope.customersAll.length
    $scope.itemsPerPage = 8
    $scope.currentPage = $routeParams.currentPage || 1
    $scope.infCurrentPage = $scope.currentPage;

    $scope.deleteConfirmation = (customer)->
      if customer
        $scope.selectedCustomers = [$scope.customersObj[customer.id]]

      confirmationDeleteModal = $modal.open
        templateUrl: 'views/modals/confirmation-delete.html'
        controller: 'ConfirmationDeleteCtrl'
        resolve:
          selectedCustomers: ->
            $scope.selectedCustomers

      confirmationDeleteModal.result.then ->
        $scope.selectedCustomers = []
      , ->
        $scope.selectedCustomers = []

    $scope.editCustomer = (customer)->
      $scope.selectedCustomers = [$scope.customersObj[customer.id]]

      editCustomerModal = $modal.open
        templateUrl: 'views/modals/edit-customer.html'
        controller: 'EditCustomerModalCtrl'
        resolve:
          customerData: ->
            $scope.selectedCustomers[0]

      editCustomerModal.result.then ->
        $scope.selectedCustomers = []
      , ->
        $scope.selectedCustomers = []

    $scope.toggleSelectCustomer = (customer)->
      index = $scope.selectedCustomers.indexOf(customer)
      if index != -1
        $scope.selectedCustomers.splice(index, 1)
      else
        $scope.selectedCustomers.push customer

    $scope.togglePagination = ->
      if $scope.paginatorEnabled
        $scope.infCurrentPage = $scope.currentPage

        $scope.paginatorEnabled = false
      else
        $scope.currentPage = $scope.infCurrentPage

        $scope.pageChanged()

        $scope.paginatorEnabled = true

    $scope.infScrollCtrl =
      calcFn: ()->
        if $scope.infCurrentPage > $scope.totalPages
          return

        $scope.customers = $scope.customersAll.slice 0, $scope.itemsPerPage * $scope.infCurrentPage
      onScroll: ->
          if $scope.infCurrentPage + 1 > $scope.totalPages
            return

          $scope.infCurrentPage++
          @calcFn()
      onEnabled: ->
        @calcFn()

    $scope.fiterSearch = (val)->
      $filter('searchText') $scope.searchText, $scope.customersAll