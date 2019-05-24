const Post = require('../models/Post')
const Category = require('../models/Category')
const Tag = require('../models/Tag')

exports.all = async (req, res, next) => {
    req.app.locals.layout = 'guest'
    next()
}

exports.index = (req, res) => {
    Post.find({})
        .populate('category')
        .populate('tag')
        .exec((errors, posts) => {
            if(errors) {
                console.log(errors)
            }
            res.render('guest/guestHome', {
                posts: posts
            })
        })
}

// exports.showCategory = (req, res) => {
//     Category.findOne({id: req.params.id})
//         .then(category => {
//             res.render('guest/guestCategory', {
//                 category: category
//             })
//         })
// }

// exports.showPost = (req, res) => {
//     Post.findOne({id: req.params.id})
//         .then(post => {
//             res.render('guest/guestPost', {
//                 post: post
//             })
//         })
// }