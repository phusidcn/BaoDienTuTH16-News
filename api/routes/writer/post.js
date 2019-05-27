const express = require('express')
const router = express.Router()
const fs = require('fs')
const { isEmpty, uploadDir } = require('../../helpers/upload-helper')
const Post = require('../../models/Post')
const Category = require('../../models/Category')

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
})

router.get('/', (req, res) => {
    Post.find({})
        .populate('category')
        .then(posts => {
            res.render('writer/posts/index', {
                posts: posts
            })
        })
})

router.get('/create', (req, res) => {
    Category.find({}).then(categories => {
        res.render('writer/posts/create', {
            categories: categories
        })
    })
})

router.post('/create', (req, res) => {
    let errors = []

    if(!req.body.title) {
        errors.push({message: 'Please add title'})
    }

    if(!req.body.content) {
        errors.push({message: 'Please add content'})
    }

    if(errors.length > 0) {
        res.render('writer/posts/create', {
            errors: errors
        })
    } else {   
        let filename = ''
        if(!isEmpty(req.files)) {
            let file = req.files.image
            filename = file.name + '-' + Date.now()
            
            file.mv('./public/uploads/' + filename, (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }
        const newPost = new Post({
            title: req.body.title,
            image: filename,
            category: req.body.category,
            status: req.body.status,
            tag: req.body.tag,
            premium: req.body.premium,
            content: req.body.content
        })
        
        newPost.save()
        .then(savedPost => {
            res.redirect('/writer/post')
        })
        .catch(err => {
            console.log(err)
        });
    }
})

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

router.put('/edit/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.status = req.body.status
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post.save()
                .then(updatedPost => {
                    req.flash('success_message', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/writer/post')
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_message', 'Post was successfully deleted');
                res.redirect('/writer/post')
            })
        })
})

module.exports = router