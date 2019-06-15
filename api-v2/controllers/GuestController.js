const User = require('../models/User')
const Category = require('../models/Category')
const Post = require('../models/Post')
const escapeRegex = require('../helpers/regex-escape')

exports.index = async (req, res, next) => {
    try {
        let arrMostViewPosts = []

        const posts = await Post.find({
            status: 3
        }).populate('category')
        const categories = await Category.find({})
        const latestPosts = await Post.find({}).sort({
            createdAt: -1
        })
        const mostViewsPosts = await Post.find({}).sort({
            like: -1
        })

        for(let index = 0; index < 4; index++) {
            arrMostViewPosts.push(mostViewsPosts[index])
        }

        res.render('guest/guestHome', {
            posts,
            categories,
            latestPosts,
            arrMostViewPosts
        })
    } catch (error) {
        next(error)
    }

}

exports.indexCategory = async (req, res, next) => {
    try {
        const posts = await Post.find({
            status: 3,
            category: {
                $in: [req.params.id]
            }
        }).populate('category')
        const categories = await Category.find({})
        res.render('guest/guestCategory', {
            posts,
            categories
        })
    } catch (error) {
        next(error)
    }
}

exports.contact = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        res.render('guest/contact', {
            categories
        })
    } catch (error) {
        next(error)
    }
}

exports.about = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        res.render('guest/about', {
            categories
        })
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