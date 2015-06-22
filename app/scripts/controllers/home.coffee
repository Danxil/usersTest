'use strict'

###*
 # @ngdoc function
 # @name testApp.controller:HomeCtrl
 # @description
 # # HomeCtrl
 # Controller of the testApp
###
angular.module('testApp')
  .controller 'HomeCtrl', (customersData, $scope, customersManager, $rootScope, $modal, $routeParams) ->
    $scope.customersObj = customersData
    $scope.customers = _.values $scope.customersObj
    $scope.selectedCustomers = []

    $scope.filter =
      orderBy:
        set: (field)->
          $scope.filter.orderBy.reverse = if ($scope.filter.orderBy.field == field) then !$scope.filter.orderBy.reverse else false
          $scope.filter.orderBy.field = field
        field: 'firstName'
        reverse: false

    $scope.pagination =
      calcAfterFilter: (array)->
        (->
          @totalItems = array.length
          @totalPages = Math.ceil $scope.pagination.totalItems / $scope.pagination.itemsPerPage
        ).call($scope.pagination)
      calcPagination: ->
        @totalItems = $scope.customers.length
        @startShowItems = @itemsPerPage * (@currentPage - 1)
        @endShowItems = @startShowItems + @itemsPerPage
      togglePagination: ->
        if @paginatorEnabled
          $scope.pagination.infCurrentPage = $scope.pagination.currentPage
          @paginatorEnabled = false
        else
          $scope.pagination.currentPage = $scope.pagination.infCurrentPage
          $scope.pagination.calcPagination()
          @paginatorEnabled = true
      totalItems: $scope.customers.length
      itemsPerPage: 8
      currentPage: $routeParams.currentPage || 1
      infCurrentPage: $routeParams.currentPage || 1
      infScrollCtrl:
        calcFn: ()->
          if $scope.pagination.infCurrentPage > $scope.pagination.totalPages
            return

          $scope.pagination.startShowItems = 0
          $scope.pagination.endShowItems = $scope.pagination.itemsPerPage * $scope.pagination.infCurrentPage
        onScroll: ->
          if $scope.pagination.infCurrentPage + 1 > $scope.pagination.totalPages
            return

          $scope.pagination.infCurrentPage++
          @calcFn()
        onEnabled: ->
          @calcFn()

    $scope.$watchCollection 'customersObj',  ->
      $scope.customers = _.values $scope.customersObj
      $scope.pagination.totalItems = $scope.customers.length
      $scope.pagination.totalPages = Math.ceil $scope.pagination.totalItems / $scope.pagination.itemsPerPage
      $scope.pagination.calcPagination()

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

        $scope.pagination.calcPagination()
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