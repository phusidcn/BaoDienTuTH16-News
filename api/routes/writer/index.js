const express = require('express')
const writerController = require('../../controllers/writerController')
const router = express.Router()

router.get('/*', writerController.all)

router.get('/new', writerController.index)
router.post('/new', writerController.store)

router.get('/:id', (req, res, next) => {
    res.send('SHOW /posts/:id');
});

router.get('/:id/edit', (req, res, next) => {
    res.send('EDIT /posts/:id/edit');
});

router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts/:id');
});

router.delete('/:id', (req, res, next) => {
    res.send('DELETE /posts/:id');
});


/* --------------------------------------------------- */
router.get('/edit-denied', writerController.editDenied)
router.get('/edit-waiting', writerController.editWaiting)
router.get('/view-censored', writerController.viewCensored)
router.get('/view-denied', writerController.viewDenied)
router.get('/view-published', writerController.viewPublished)
router.get('/view-waiting', writerController.viewWaiting)

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