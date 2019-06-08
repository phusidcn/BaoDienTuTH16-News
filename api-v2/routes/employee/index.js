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
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()
})

// Welcome Page
router.get('/', (req, res) => {
    res.render('employee/welcome')
})

// Info Page
router.get('/writers/', writerEnsureAuthenticated, (req, res) => {
    res.render('employee/index')
})
router.all('/writers/dashboard/*', writerEnsureAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()    
})

router.get('/editors', editorEnsureAuthenticated, (req, res) => {
    res.render('employee/index')
})
router.all('/editors/dashboard/*', editorEnsureAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()    
})


router.get('/admins', adminEnsureAuthenticated, (req, res) => {
    res.render('employee/index')
})

// router.get('/admins/dashboard', adminEnsureAuthenticated ,(req, res) => {
//     res.render('employee/index')
// })
router.all('/admins/dashboard/*', adminEnsureAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()    
})

// Business Page

// WRITER ROUTES
router.get('/writers/dashboard', (req, res) => {
    res.render('employee/index')
})
router.get('/writers/dashboard/index', writerController.index)
router.get('/writers/dashboard/create',  writerController.indexCreate)
router.post('/writers/dashboard/create', writerController.create)
router.get('/writers/dashboard/edit/:id', writerController.indexUpdate)
router.put('/writers/dashboard/edit/:id', writerController.update)
router.delete('/writers/dashboard/delete/:id', writerController.delete)

router.get('/writers/dashboard/approved', writerController.approved)
router.get('/writers/dashboard/published', writerController.published)

router.get('/writers/dashboard/waiting', writerController.waiting)
router.get('/writers/dashboard/waiting/edit/:id', writerController.indexUpdateWaiting)
router.put('/writers/dashboard/waiting/edit/:id', writerController.updateWaiting)
router.delete('/writers/dashboard/waiting/:id', writerController.deleteWaiting)

router.get('/writers/dashboard/rejected', writerController.rejected)
router.get('/writers/dashboard/rejected/edit/:id', writerController.indexUpdateRejected)
router.put('/writers/dashboard/rejected/edit/:id', writerController.updateRejected)
router.delete('/writers/dashboard/rejected/:id', writerController.deleteRejected)

// EDITOR ROUTES
router.get('/editors/dashboard', (req, res) => {
    res.render('employee/index')
})
router.get('/editors/dashboard/draft', editorEnsureAuthenticated ,editorController.draft)

// ADMIN ROUTES
router.get('/admins/dashboard', (req, res) => {
    res.render('employee/index')
})
/**
 * Category
 */
router.get('/admins/dashboard/category', adminController.indexCategory)
router.get('/admins/dashboard/category/create', adminController.indexCreateCategory)
router.post('/admins/dashboard/category/create', adminController.createCategory)
router.get('/admins/dashboard/category/edit/:id', adminController.indexUpdateCategory)
router.put('/admins/dashboard/category/edit/:id', adminController.updateCategory)
router.delete('/admins/dashboard/category/:id', adminController.deleteCategory)

/**
 * Tag
 */
router.get('/admins/dashboard/tag', adminController.indexTag)
router.get('/admins/dashboard/tag/create', adminController.indexCreateTag)
router.post('/admins/dashboard/tag/create', adminController.createTag)
router.get('/admins/dashboard/tag/edit/:id', adminController.indexUpdateTag)
router.put('/admins/dashboard/tag/edit/:id', adminController.updateTag)
router.delete('/admins/dashboard/tag/:id', adminController.deleteTag)

/**
 * Post
 */
// router.get('/admins/post', adminController.indexPost)
// router.get('/admins/post/:id', adminController.showPost)
// router.get('/admins/post/edit/:id', adminController.indexUpdatePost)
// router.post('/admins/post/edit/:id', adminController.updatePost)
// router.delete('/admins/post/:id', adminController.deletePost)

module.exports = router;