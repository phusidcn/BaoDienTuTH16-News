const fs = require('fs')
const mongoose = require('mongoose')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const User = require('./../models/User')

exports.draft = (req, res, next) => {
    try {
        Post
            .find({
                category: {
                    $in: [req.user.category]
                }
            })
            .exec((err, posts) => {
                if(err) console.log(err)
                res.render('editor/posts/index', {
                    posts
                })
            })
        console.log(req.user)
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
