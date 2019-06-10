const express = require('express')
const router = express.Router()
const guestController = require('../../controllers/GuestController')

// Main Page
router.get('/', guestController.index)
router.get('/:id', guestController.show)

module.exports = router