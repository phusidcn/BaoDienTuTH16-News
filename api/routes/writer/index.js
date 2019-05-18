const express = require('express')
const writerController = require('../../controllers/writerController')
const router = express.Router()

router.get('/*', writerController.all)
router.get('/create', writerController.index)
router.get('/edit-denied', writerController.editDenied)
router.get('/edit-waiting', writerController.editWaiting)
router.get('/view-censored', writerController.viewCensored)
router.get('/view-denied', writerController.viewDenied)
router.get('/view-published', writerController.viewPublished)
router.get('/view-waiting', writerController.viewWaiting)

router.post('/create', writerController.store)

module.exports = router

/*
GET index           /writer
GET new             /writer/new
POST create         /writer
GET show            /writer/:id
GET edit            /writer/:id/edit
PUT update          /writer/:id
DELETE destroy      /writer/:id
*/