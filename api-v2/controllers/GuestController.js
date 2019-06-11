const User = require('../models/User')
const Category = require('../models/Category')
const Post = require('../models/Post')
const escapeRegex = require('../helpers/regex-escape')

exports.index = async (req, res, next) => {
    try {
        const posts = await Post.find({}).populate('category')
        const categories = await Category.find({})
        res.render('guest/guestHome', {
            posts,
            categories
        })
        // next()
    } catch (error) {
        next(error)
    }

}

exports.show = async (req, res, next) => {
    try {
        const foundPost = await Post.findOne({ id: req.params.id })
        res.render('guest/guestPost', {
            foundPost
        })
    } catch (error) {
        next(error)
    }

}

// exports.paginate = async (req, res, next) => {
//     const perPage = 9
//     const page = req.params.page || 1

//     try {
//         Post
//         .find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, posts) {
//             Post.count().exec(function(err, count) {
//                 if (err) return next(err)
//                 res.render('guest/guestHome', {
//                     posts: posts,
//                     current: page,
//                     pages: Math.ceil(count / perPage)
//                 })
//             })
//         })
//     } catch (error) {
//         throw new Error (error)
//     }
// }