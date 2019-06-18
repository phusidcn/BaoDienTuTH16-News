const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const Tag = require('./../models/Tag')
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
                                res.redirect('/employee/writers/dashboard/profile')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                })
        })
}

exports.changePass = (req, res) => {
    User
    .findOne({
        _id: req.params.id
    })
    .then(writer => {
        res.render('writer/changePassword',{
            writer : writer,
            layout : false
        })
    })
}


exports.changePassApply = (req, res) => {
    let errors = []
    if (req.body.newpass !== req.body.confirmpass) {
        errors.push({
            msg: "Please re-confirm your password"
        })
    }
    let pass = req.body.newpass
    if(pass.length < 6) {
        errors.push({
            msg: "Your new pass is too short"
        })
    }
    User
    .findOne({
        _id: req.params.id
    })
    .then(writer => {
        console.log(writer)
        bcrypt.compare(req.body.oldpass, writer.password, (err, isMatch) => {
            if (!isMatch) {
                console.log(err)
                errors.push({
                    msg: "please check your old password"
                })
            }
            if (errors.length > 0) {
                res.render('writer/changePassword', {
                    errors,
                    writer,
                    layout : false
                })
            } else {
                if (isMatch) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.newpass, salt, (err, hash) => {
                            if (err){
                                errors.push({
                                    msg: "Error"
                                })
                                throw err
                            } else {
                                writer.password = hash
                                writer.save()
                                res.redirect('/employee/writers/dashboard')
                            }
                        })
                    })
                }
            }
        })
    })
}

exports.index = (req, res, next) => {
    try {
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10
        const page = req.query.page ? parseInt(req.query.page) : 1
        Post
            .find({
                writer: {
                    $in: [req.user.id]
                }
            })
            .populate('category')
            .sort({ createdAt: -1 })
            .skip((page - 1) * pagination)
            .limit(pagination)
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
            Tag
            .find({})
            .then(tags => {
                res.render('writer/posts/create', {
                    categories,
                    tags
                })
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

        if (newPost.tag != null) {
            console.log(newPost)
        }

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
            status: 1,
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
            status: 3,
            writer: {
                $in: [req.user.id]
            }
        })
        .populate('category')
        .exec((err, posts) => {
            console.log(posts)
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
                    res.redirect('/employee/writers/dashboard/waiting')
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
                res.redirect('/employee/writers/dashboard/waiting')
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
                    res.redirect('/employee/writers/dashboard/rejected')
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
                res.redirect('/employee/writers/dashboard/rejected')
            })
        })
}