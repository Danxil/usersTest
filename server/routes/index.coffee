express = require 'express'
router = express.Router()

path = require('path');

customers = path.join(__dirname, '../storage/customers')

router.get '/customers/:id?', (req, res) ->
  res.sendFile path.join(customers, (req.params.id || 'all') + '.json')

router.put '/customers/:id', (req, res) ->
  res.send 200

router.post '/customers/:id', (req, res) ->
  res.send 200


module.exports = router
