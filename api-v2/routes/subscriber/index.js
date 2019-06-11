const express = require('express')
const router = express.Router()
const subscriberController = require('../../controllers/SubscriberController')

// Main Page
router.get('/', subscriberController.index)
router.get('/:page', subscriberController.paginate)
router.get('/:id', subscriberController.show)

module.exports = router