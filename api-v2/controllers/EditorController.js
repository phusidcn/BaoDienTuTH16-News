const fs = require('fs')
const mongoose = require('mongoose')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const User = require('./../models/User')
const bcrypt = require('bcryptjs')
const cron = require('node-cron')

exports.draft = async (req, res, next) => {
    try {
        let task = cron.schedule('0 * * * *', () => {
            alert('Publish bài viết nhé')
        }, {
            scheduled: false
        })
        task.start()
        const posts = await Post
            .find({
                category: {
                    $in: [req.user.category],
                },
                status: 0
            }).populate('category')

            // .then((err, posts) => {
                // console.log(posts)
                // if(err) console.log(err)
                res.render('editor/draft', {
                    posts
                })
            
        // console.log(req.user)
    } catch (err) {
        next(err)
    }
}

exports.updateProfile = (req, res) => {
    const {
        email,
        name,
    } = req.body

    let filename = ''
    if (!isEmpty(req.files)) {
        let file = req.files.avatar
        filename = file.name + '-' + Date.now()

        file.mv('./public/uploads/' + filename, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    User
        .findOne({
            _id: req.params.id
        })
        .then(editor => {
            editor.email = email
            editor.name = name
            editor.avatar = filename

            editor
                .save()
                .then(updatededitor => {
                    req.flash('success_msg', `Account ${updatededitor.name} was successfully updated`);
                    res.redirect('/employee/editors/dashboard/')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.changePass = (req, res) => {
    User
    .findOne({
        _id: req.params.id
    })
    .then(editor => {
        res.render('editor/changePassword',{
            editor : editor,
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
    .then(editor => {
        console.log(editor)
        bcrypt.compare(req.body.oldpass, editor.password, (err, isMatch) => {
            if (!isMatch) {
                console.log(err)
                errors.push({
                    msg: "please check your old password"
                })
            }
            if (errors.length > 0) {
                res.render('editor/changePassword', {
                    errors,
                    editor,
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
                                editor.password = hash
                                editor.save()
                                res.redirect('/employee/editors/dashboard')
                            }
                        })
                    })
                }
            }
        })
    })
}

exports.rejected = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            console.log(post)
            console.log(req.body.nntc)
            post.status = 2
            post.save()
            res.redirect('/employee/editors/dashboard/draft')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.approved = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            console.log(post)
            res.render('editor/edit',{
                post
            })
        })
        .catch (err => {
            console.log(err)
        })
}

exports.accept = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
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
            post.content = req.body.editor
            post.subContent = req.body.subContent
            post.title = req.body.title
            post.tag = req.body.tag
            //if (req.body.image == )
            //post.image = filename
            post.status = 1
            post.save()
            res.redirect('/employee/editors/dashboard/draft')
        })
        .catch(err => {
            console.log(err)
        })
}