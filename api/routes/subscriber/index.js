const express = require('express')
const subscriberController = require('../../controllers/subscriberController')
const router = express.Router()

router.get('/*', subscriberController.all)
router.get('/', subscriberController.index)
router.get('/category', subscriberController.showCategory)
router.get('/post', subscriberController.showPost)

module.exports = router