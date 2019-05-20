const express = require('express')
const uploadImage = require('../../middleware/multer')
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

router.post('/create',
    uploadImage('posts').single('image'),
    writerController.store)

module.exports = router