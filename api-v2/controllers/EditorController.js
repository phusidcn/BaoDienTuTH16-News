const fs = require('fs')
const mongoose = require('mongoose')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const User = require('./../models/User')

exports.draft = async (req, res, next) => {
    try {
        const posts = await Post
            .find({
                /*category: {
                    $in: [req.user.category]
                }*/
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
        password,
        name
    } = req.body

    User
        .findOne({
            _id: req.params.id
        })
        .then(editor => {
            editor.email = email
            editor.name = name
            editor.password = password

            bcrypt
                .genSalt(10, (err, salt) => {
                    bcrypt.hash(editor.password, salt, (err, hash) => {
                        if (err) throw err
                        editor.password = hash
                        editor
                            .save()
                            .then(updatedEditor => {
                                req.flash('success_msg', `Account ${updatedEditor.name} was successfully updated`);
                                res.redirect('/employee/editors/dashboard/')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                })
        })
}

exports.reject = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
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