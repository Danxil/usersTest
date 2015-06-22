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
  .filter 'filterByText', ()->
    (input, text, ageFrom, ageTo, callback) ->
      if !text && !ageFrom && !ageTo
        if callback
          callback input

        return input

      if text && text.toLowerCase
        text = text.toLowerCase()
      ageFrom = parseInt ageFrom
      ageTo = parseInt ageTo

      output = _.filter input, (item)->
        success = false
        currentAge = parseInt item.age

        for key of item
          field = item[key]

          if key == '$$hashKey' || key == 'id'
            continue

          if field.toLowerCase
            field = field.toLowerCase()

          success = (field.indexOf(text) != -1 || !text) &&
              (currentAge >= ageFrom || !ageFrom) && (currentAge <= ageTo || !ageTo)

          if success
            break

        success

      if callback
        callback output

      output