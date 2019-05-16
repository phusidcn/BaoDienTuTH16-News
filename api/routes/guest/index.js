const express = require('express')
const guestController = require('../../controllers/guestController')
const router = express.Router()

router.all('/*', guestController.all)
router.get('/', guestController.index)
router.get('/category', guestController.showCategory)
router.get('/post', guestController.showPost)

module.exports = router