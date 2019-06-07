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

router.get('/writers/index', writerController.index)
router.get('/writers/create', writerController.indexCreate)
router.post('/writers/create', writerController.create)

module.exports = router;