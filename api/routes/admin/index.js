const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.get('/', adminController.index)

module.exports = router
