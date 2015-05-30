express = require 'express'
router = express.Router()

path = require('path');

customers = path.join(__dirname, '../storage/customers')

router.get '/customers/:id?', (req, res) ->
  res.sendFile path.join(customers, (req.params.id || 'all') + '.json')

module.exports = router
