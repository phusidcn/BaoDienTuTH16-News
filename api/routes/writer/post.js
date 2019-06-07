const express = require('express')
const router = express.Router()
const Post = require('../../models/Post')
const Category = require('../../models/Category')
const { ensureAuthenticated } = require('../../helpers/writerAuth')
const writerController = require('../../controllers/writerController')

router.get('/', ensureAuthenticated ,writerController.post)
router.get('/create', (req, res) => {
    Category.find({}).then(categories => {
        res.render('writer/posts/create', {
            categories: categories
        })
    })
})
router.post('/create',writerController.create)
router.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            Category.find({}).then(categories => {
                res.render('writer/posts/edit', {
                    post: post,
                    categories: categories
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
})
router.put('/edit/:id', writerController.edit)
router.delete('/:id', writerController.delete)






router.get('/approved', writerController.approvedPost)
router.get('/published', writerController.publishedPost)

router.get('/waiting-approved', writerController.waitingApprovedPost)
router.get('/waiting-approved/edit/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            Category.find({}).then(categories => {
                res.render('writer/posts/edit-waiting-approved', {
                    post: post,
                    categories: categories
                })
            })
        })
})
router.put('/waiting-approved/edit/:id', writerController.editWaitingApproved)
router.delete('/waiting-approved/:id', writerController.deleteWaitingApproved)

router.get('/rejected', writerController.rejectedPost)
router.get('/rejected/edit/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            Category.find({}).then(categories => {
                res.render('writer/posts/edit-rejected', {
                    post: post,
                    categories: categories
                })
            })
        })
})
router.put('/rejected/edit/:id', writerController.editRejected)
router.delete('/rejected/:id', writerController.deleteRejected)

module.exports = router