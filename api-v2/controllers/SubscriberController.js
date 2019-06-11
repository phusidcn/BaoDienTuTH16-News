const User = require('../models/User')
const Category = require('../models/Category')
const Post = require('../models/Post')
const escapeRegex = require('../helpers/regex-escape')

exports.index = async (req, res) => {
    const posts = await Post.find({}).populate('category')
    const categories = await Category.find({})
    res.render('subscriber/subscriberHome', {
        posts,
        categories
    })
}

exports.show = async (req, res) => {
    const foundPost = await Post.findById(req.params.id)
    res.render('subscriber/subscriberPost', {
        foundPost
    })
}

exports.paginate = async (req, res, next) => {
    const perPage = 9
    const page = req.params.page || 1

    try {
        Post
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, posts) {
            Post.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('subscriber/subscriberHome', {
                    posts: posts,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    } catch (error) {
        throw new Error (error)
    }
}