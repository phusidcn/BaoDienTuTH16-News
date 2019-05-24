const express = require('express')
const writerController = require('../../controllers/writerController')
const router = express.Router()

router.get('/*', writerController.all)

router.get('/', writerController.index)




module.exports = router

