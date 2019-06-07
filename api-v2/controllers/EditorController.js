const fs = require('fs')
const mongoose = require('mongoose')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')

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
                res.render('writer/posts/index', {
                    posts
                })
            })
        console.log(req.user)
    } catch (err) {
        next(err)
    }
}
