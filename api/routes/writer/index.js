const express = require('express')
const writerController = require('../../controllers/writerController')
const router = express.Router()

router.get('/*', writerController.all)
router.get('/', writerController.index)
router.get('/edit-denied', writerController.editDenied)
router.get('/edit-waiting', writerController.editWaiting)
router.get('/view-censored', writerController.viewCensored)
router.get('/view-denied', writerController.viewDenied)
router.get('/view-published', writerController.viewPublished)
router.get('/view-waiting', writerController.viewWaiting)

module.exports = router