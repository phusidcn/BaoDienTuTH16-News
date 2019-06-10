const express = require('express')
const router = express.Router()
const guestController = require('../../controllers/GuestController')

// Main Page
router.get('/', guestController.index)

module.exports = router