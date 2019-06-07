const bcrypt = require('bcryptjs')
const passport = require('passport')
const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const Writer = require('../models/User')

exports.index = (req, res, next) => {
    try {
        Post
            .find({
                writer: {
                    $in: [req.user.id]
                }
            })
            .populate('category')
            .exec((err, posts) => {
                if(err) console.log(err)
                res.render('writer/posts/index', {
                    posts
                })
            })
        console.log(req.user)
    } catch (err) {
        next(err)
    }
}

exports.indexCreate = (req, res) => {
    Category
        .find({})
        .then(categories => {
            res.render('writer/posts/create', {
                categories
            })
        }) 
        .catch(err => {
            console.log(err)
        })
}

exports.create = (req, res) => {
    const { 
        title, 
        content 
    } = req.body
    
    let errors = []

    if (!title || !content) {
        errors.push({ 
            msg: 'Please add all fields' 
        })
    }

    if (errors.length > 0) {
        res.render('writer/posts/create', {
            title,
            content,
            errors: errors
        })
    } else {
        let filename = ''
        if (!isEmpty(req.files)) {
            let file = req.files.image
            filename = file.name + '-' + Date.now()

            file.mv('./public/uploads/' + filename, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        const newPost = new Post({
            title: req.body.title,
            image: filename,
            like: 0,
            category: req.body.category,
            status: 0,
            tag: req.body.tag,
            premium: req.body.premium,
            content: req.body.content,
            writer: req.user.id
        })

        newPost.save()
            .then(savedPost => {
                res.redirect('/employee/writers/index')
            })
            .catch(err => {
                console.log(err)
            });
    }
}

exports.indexUpdate = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            Category
                .find({})
                .then(categories => {
                    res.render('writer/posts/edit', {
                        post,
                        categories
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.update = (req, res) => {
    const {
        title,
        status,
        content,
        premium,
        category
    } = req.body

    Post
        .findOne({ 
            _id: req.params.id 
        })
        .then(post => {
            post.title = title
            post.status = status
            post.content = content
            post.premium = premium
            post.category = category
            
            post
                .save()
                .then(updatedPost => {
                    req.flash('success_msg', `Post ${updatedPost.title} was successfully updated`);
                    res.redirect('/employee/writers/index')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.delete = (req, res) => {
    Post
        .deleteOne({ 
            _id: req.params.id 
        })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_msg', 'Post was successfully deleted');
                res.redirect('/employee/writers/index')
            })
        })
}