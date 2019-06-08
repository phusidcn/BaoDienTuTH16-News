const fs = require('fs')
const mongoose = require('mongoose')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')

exports.draft = (req, res, next) => {
    try {
        Post
            .find({})
            .exec((err, posts) => {
                if(err) console.log(err)
                res.render('editor/draft', {
                    posts
                })
            })
        console.log(req.user)
    } catch (err) {
        next(err)
    }
}

exports.reject = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            post.status = 2
            post.save()
            res.redirect('/employee/editors/draft')
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