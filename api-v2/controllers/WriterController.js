const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.updateProfile = (req, res) => {
    const {
        email,
        password,
        name
    } = req.body

    User
        .findOne({
            _id: req.params.id
        })
        .then(writer => {
            writer.email = email
            writer.name = name
            writer.password = password

            bcrypt
                .genSalt(10, (err, salt) => {
                    bcrypt.hash(writer.password, salt, (err, hash) => {
                        if (err) throw err
                        writer.password = hash
                        writer
                            .save()
                            .then(updatedWriter => {
                                req.flash('success_msg', `Account ${updatedWriter.name} was successfully updated`);
                                res.redirect('/employee/writers/dashboard/')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                })
        })
}

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
                if (err) console.log(err)
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
            status: 0,
            like: 0,
            category: req.body.category,
            tag: req.body.tag,
            premium: req.body.premium,
            subContent: req.body.subContent,
            content: req.body.content,
            writer: req.user.id
        })

        newPost.save()
            .then(savedPost => {
                res.redirect('/employee/writers/dashboard/index')
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
                    res.redirect('/employee/writers/dashboard/index')
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
                res.redirect('/employee/writers/dashboard/index')
            })
        })
}

exports.approved = (req, res) => {
    const approved_status = 1
    Post
        .find({
            status: approved_status,
            writer: {
                $in: [req.user.id]
            }
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/approved', {
                posts: posts
            })
        })
}

exports.published = (req, res) => {
    const published_status = 3
    Post
        .find({
            status: published_status,
            writer: {
                $in: [req.user.id]
            }
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/published', {
                posts: posts
            })
        })
}

exports.waiting = (req, res) => {
    const waiting_approved_status = 0
    Post
        .find({
            status: 0,
            writer: {
                $in: [req.user.id]
            }
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/waiting-approved', {
                posts: posts
            })
        })
}

exports.indexUpdateWaiting = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            Category
                .find({})
                .then(categories => {
                    res.render('writer/posts/edit-waiting-approved', {
                        post,
                        categories
                    })
                })
        })
}

exports.updateWaiting = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            post.title = req.body.title
            post.status = 0
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category
            post.writer = req.user.id

            post
                .save()
                .then(updatedPost => {
                    req.flash('success_msg', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/employee/writers/waiting')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.deleteWaiting = (req, res) => {
    Post
        .deleteOne({ _id: req.params.id })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_msg', 'Post was successfully deleted');
                res.redirect('/employee/writers/waiting')
            })
        })
}

exports.rejected = (req, res) => {
    const rejected_status = 2
    Post
        .find({
            status: rejected_status
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/rejected', {
                posts
            })
        })
}

exports.indexUpdateRejected = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            Category
                .find({})
                .then(categories => {
                    res.render('writer/posts/edit-rejected', {
                        post,
                        categories
                    })
                })
        })
}

exports.updateRejected = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            post.title = req.body.title
            post.status = 2
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post
                .save()
                .then(updatedPost => {
                    req.flash('success_msg', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/employee/writers/rejected')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.deleteRejected = (req, res) => {
    Post
        .deleteOne({
            _id: req.params.id
        })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_msg', 'Post was successfully deleted');
                res.redirect('/employee/writers/rejected')
            })
        })
}