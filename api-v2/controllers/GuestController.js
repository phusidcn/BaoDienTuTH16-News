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
        // const perPage = 10
        // const page = req.query.page || 1

        // const posts = await Post.find({
        //     status: 3,
        //     category: {
        //         $in: [req.params.id]
        //     }
        // }).populate('category')
        // .skip((perPage * page) - perPage)
        // .limit(perPage)
        // const foundCategory = await Category.findOne({
        //     _id: req.params.id
        // })
        // const categories = await Category.find({})
        
        // Post.count().then(postCount => {

        // })
        // res.render('guest/guestCategory', {
        //     posts,
        //     foundCategory,
        //     categories
        // })
        const perPage = 10
        const page = req.query.page || 1
        const foundCategory = await Category.findOne({
            _id: req.params.id
        })


        Post
            .find({
                status: 3,
                category: {
                    $in: [req.params.id]
                }
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then(posts => {
                Post
                    .count()
                    .then(postCount => {
                        Category
                            .find({})
                            .then(categories => {
                                res.render('guest/guestCategory', {
                                    posts,
                                    foundCategory,
                                    categories,
                                    current: parseInt(page),
                                    pages: Math.ceil(postCount / perPage)
                                })
                            })
                    })
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
                    .populate({
                        path: 'comments',
                        populate: { path: 'user', model: 'User' }
                    })
        const categories = await Category.find({})
        console.log(foundPost)
        res.render('guest/guestPost', {
            foundPost,
            categories,
            user: req.user,
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
                    newComment.save().then(savedComment => {
                        res.redirect(`/home/${post.id}`)
                    })
                })
            })
    } catch (error) {
        next(error)
    }
}