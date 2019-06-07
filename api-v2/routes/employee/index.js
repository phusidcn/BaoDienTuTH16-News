const express = require('express')
const router = express.Router()
const { 
        writerEnsureAuthenticated,
        editorEnsureAuthenticated,
        adminEnsureAuthenticated,
    } = require('../../helpers/auth')
    
const editorController = require('../../controllers/EditorController')
const writerController = require('../../controllers/WriterController')
const adminController  = require('../../controllers/AdminController')
// Main Page
router.get('/*', (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()
})


// Welcome Page
router.get('/', (req, res) => {
    res.render('employee/welcome')
})

// Info Page

router.get('/writers/dashboard', writerEnsureAuthenticated ,(req, res) => 
    res.render('employee/index', {
        layout: false
    })
);

router.get('/editors/dashboard', editorEnsureAuthenticated ,(req, res) => {
    res.render('employee/index')
})

router.get('/admins/dashboard', adminEnsureAuthenticated ,(req, res) => {
    res.render('employee/index')
})

// Business Page

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

// EDITOR ROUTES
router.get('/editors/draft', editorEnsureAuthenticated ,editorController.draft)

// ADMIN ROUTES
/**
 * Category
 */
router.get('/admins/category', adminController.indexCategory)
router.get('/admins/category/create', adminController.indexCreateCategory)
router.post('/admins/category/create', adminController.createCategory)
router.get('/admins/category/edit/:id', adminController.indexUpdateCategory)
router.put('/admins/category/edit/:id', adminController.updateCategory)
router.delete('/admins/category/:id', adminController.deleteCategory)

/**
 * Tag
 */
router.get('/admins/tag', adminController.indexTag)
router.get('/admins/tag/create', adminController.indexCreateTag)
router.post('/admins/tag/create', adminController.createTag)
router.get('/admins/tag/edit/:id', adminController.indexUpdateTag)
router.put('/admins/tag/edit/:id', adminController.updateTag)
router.delete('/admins/tag/:id', adminController.deleteTag)


module.exports = router;