const User = require('../models/User')
const Category = require('../models/Category')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
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
        const foundPost = await Post.findOne({ _id: req.params.id })
                    .populate('category')
                    .populate('writer')
                    .populate('comments')
        const categories = await Category.find({})
        console.log(foundPost)
        res.render('guest/guestPost', {
            foundPost,
            categories,
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}

exports.comment = (req, res, next) => {
    try {
        Post
            .findOne({
                _id: req.body.id
            })
            .then(post => {
                // console.log(post)
                const newComment = new Comment({
                    user: req.user.id,
                    content: req.body.content
                })

                post.comments.push(newComment)
                post.save().then(savedPost => {
                    res.redirect(`/home/${post.id}`)
                })
            })
    } catch (error) {
        next(error)
    }
}