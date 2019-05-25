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
    console.log(req.files)
    // const newPost = new Post({
    //     title: req.body.title,
    //     image: req.body.image
    //     category: req.body.category,
    //     status: req.body.status,
    //     tag: req.body.tag,
    //     premium: req.body.premium,
    //     content: req.body.content
    // });

    // newPost.save()
    //     .then(savedPost => {
    //         res.redirect('/writer/post')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
})

router.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            res.render('writer/posts/edit', {
                post: post
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.put('/edit/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.status = req.body.status
            post.content = req.body.content
            post.premium = req.body.premium

            post.save()
                .then(updatedPost => {
                    res.redirect('/writer/post')
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/writer/post')
        })
})

module.exports = router