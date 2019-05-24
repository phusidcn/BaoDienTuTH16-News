const express = require('express')
const router = express.Router()
const Post = require('../../models/Post')

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
})

router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            res.render('writer/posts/index', {
                posts: posts
            })
        })
})

module.exports = router