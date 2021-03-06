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
    if(!req.user) {
        res.render('employee/welcome')
    } else {
        if(req.user && req.user.role === 'WRITER') {
            res.redirect('employee/writers/dashboard/profile')
        } else if (req.user && req.user.role === 'EDITOR') {
            res.redirect('employee/editors/dashboard/profile')
        } else if (req.user && req.user.role === 'ADMIN') {
            res.redirect('employee/admins/dashboard/profile')
        }
    }   
})

// Info Page
router.get('/writers', writerEnsureAuthenticated, (req, res) => {
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
router.all('/admins/dashboard/*', adminEnsureAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()    
})

// Business Page

// WRITER ROUTES
router.get('/writers/dashboard/', writerEnsureAuthenticated ,(req, res) => {
    res.render('employee/index')
})
router.get('/writers/dashboard/profile', (req, res) => {
    res.render('employee/index')
})

router.get('/writers/dashboard/changePass/:id', writerController.changePass)
router.post('/writers/dashboard/changePass/:id', writerController.changePassApply)

router.put('/writers/dashboard/profile/:id', writerController.updateProfile)
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
router.get('/editors/dashboard/', editorEnsureAuthenticated ,(req, res) => {
    res.render('employee/index')
})
router.get('/editors/dashboard/profile', (req, res) => {
    res.render('employee/index')
})

router.get('/editors/dashboard/changePass/:id', editorController.changePass)
router.post('/editors/dashboard/changePass/:id', editorController.changePassApply)

router.put('/editors/dashboard/profile/:id', editorController.updateProfile)
router.get('/editors/dashboard/draft', editorEnsureAuthenticated ,editorController.draft)
router.get('/editors/dashboard/edit/:id',editorEnsureAuthenticated, editorController.approved)
router.post('/editors/dashboard/accept/:id',editorController.accept)
router.delete('/editors/dashboard/rejected/:id',editorController.rejected)

// ADMIN ROUTES
router.get('/admins/dashboard/', adminEnsureAuthenticated ,(req, res) => {
    res.render('employee/index')
})
router.get('/admins/dashboard/profile', (req, res) => {
    res.render('employee/index')
})

router.get('/admins/dashboard/changePass/:id', adminController.changePass)
router.post('/admins/dashboard/changePass/:id', adminController.changePassApply)

router.put('/admins/dashboard/profile/:id', adminController.updateProfile)
/**
 * Category
 */
router.get('/admins/dashboard/category', adminController.indexCategory)
router.get('/admins/dashboard/category/create', adminController.indexCreateCategory)
router.post('/admins/dashboard/category/create', adminController.createCategory)
router.get('/admins/dashboard/category/edit/:id', adminController.indexUpdateCategory)
router.put('/admins/dashboard/category/edit/:id', adminController.updateCategory)
router.get('/admins/dashboard/category/:id/addsub', adminController.indexAddSubCate)
router.post('/admins/dashboard/category/:id/addsub', adminController.addSubcategory)
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
router.get('/admins/dashboard/post', adminController.indexPost)
router.get('/admins/dashboard/post/edit/:id', adminController.indexUpdatePost)
router.put('/admins/dashboard/post/edit/:id', adminController.updatePost)
router.delete('/admins/dashboard/post/:id', adminController.deletePost)

/**
 * Writer
 */
router.get('/admins/dashboard/writer', adminController.indexWriter)
router.get('/admins/dashboard/writer/create', adminController.indexCreateWriter)
router.post('/admins/dashboard/writer/create', adminController.createWriter)
router.get('/admins/dashboard/writer/edit/:id', adminController.indexUpdateWriter)
router.put('/admins/dashboard/writer/edit/:id', adminController.updateWriter)
router.delete('/admins/dashboard/writer/:id', adminController.deleteWriter)

/**
 * Editor
 */
router.get('/admins/dashboard/editor', adminController.indexEditor)
router.get('/admins/dashboard/editor/create', adminController.indexCreateEditor)
router.post('/admins/dashboard/editor/create', adminController.createEditor)
router.get('/admins/dashboard/editor/edit/:id', adminController.indexUpdateEditor)
router.put('/admins/dashboard/editor/edit/:id', adminController.updateEditor)
router.delete('/admins/dashboard/editor/:id', adminController.deleteEditor)

/**
 * Subscriber
 */
router.get('/admins/dashboard/subscriber',adminController.indexSubscriber)
router.get('/admins/dashboard/subscriber/edit/:id', adminController.indexUpdateSubscriber)
router.put('/admins/dashboard/subscriber/edit/:id', adminController.updateSubscriber)
router.delete('/admins/dashboard/subscriber/ban/:id',adminController.banSubscriber)

module.exports = router