const express = require('express')
const editorController = require('../../controllers/editorController')
const router = express.Router()

router.all('/*', editorController.all)
router.get('/', editorController.index)
router.get('/view-censored', editorController.viewCensored)
router.get('/view-denied', editorController.viewDenied)
router.get('/view-draft', editorController.viewDraft)
router.get('/view-list-content', editorController.viewListContent)


module.exports = router