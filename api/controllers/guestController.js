const Post = require('../models/Post')
const Category = require('../models/Category')
const Tag = require('../models/Tag')

exports.all = async (req, res, next) => {
    req.app.locals.layout = 'guest'
    next()
}

exports.index = (req, res) => {
    Post.find({})
        .populate('writer')
        .exec((errors, posts) => {
            if(errors) {
                console.log(errors)
            }
            res.render('guest/guestHome', {
                posts: posts
            })
        })
}

exports.showPost = (req, res) => {
    Post.findOne({id: req.params.id})
        .populate('writer')
        .exec((err, post) => {
            if(err) console.log(err)
            res.render('guest/guestPost', {
                post: post
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
