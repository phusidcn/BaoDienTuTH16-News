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

router.get('/create', (req, res) => {
    res.render('writer/posts/create')
})

router.post('/create', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        category: req.body.category,
        status: req.body.status,
        tag: req.body.tag,
        content: req.body.content
    });

    newPost.save()
        .then(savedPost => {
            res.redirect('/writer/post');
        })
        .catch(err => {
            console.log(err);
        });
})

module.exports = router