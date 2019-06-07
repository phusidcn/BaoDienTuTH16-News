const express = require('express')
const router = express.Router()
const { 
        writerEnsureAuthenticated,
        editorEnsureAuthenticated,
    } = require('../../helpers/auth')
    
const Category = require('../../models/Category')
const writerController = require('../../controllers/WriterController')

// Main Page
router.get('/*', (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()
})

// Trang thong tin ca nhan

router.get('/writers/dashboard', writerEnsureAuthenticated ,(req, res) => 
    res.render('employee/index')
);

router.get('/editors/dashboard', editorEnsureAuthenticated ,(req, res) => {
    res.render('employee/index')
})

// Trang Nghiep vu

// WRITER ROUTES

router.get('/writers/index', writerEnsureAuthenticated ,writerController.index)
router.get('/writers/create', writerEnsureAuthenticated ,writerController.indexCreate)
router.post('/writers/create', writerController.create)
router.get('/writers/edit/:id', writerController.indexUpdate)
router.put('/writers/edit/:id', writerController.update)
router.delete('/writers/delete/:id', writerController.delete)

router.get('/writers/approved', writerController.approved)
router.get('/writers/published', writerController.published)

router.get('/writers/waiting', writerController.waiting)
router.get('/writers/waiting/edit/:id', writerController.indexUpdateWaiting)
router.put('/writers/waiting/edit/:id', writerController.updateWaiting)
router.delete('/writers/waiting/:id', writerController.deleteWaiting)

router.get('/writers/rejected', writerController.rejected)
router.get('/writers/rejected/edit/:id', writerController.indexUpdateRejected)
router.put('/writers/rejected/edit/:id', writerController.updateRejected)
router.delete('/writers/rejected/:id', writerController.deleteRejected)

module.exports = router;