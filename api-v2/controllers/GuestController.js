const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(require('../config/config').sendGridID)
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const util = require('util')
const Category = require('../models/Category')
const Tag = require('../models/Tag')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
const escapeRegex = require('../helpers/regex-escape')

exports.indexForgot = (req, res) => {
    res.render('guest/forgot')
}

exports.putForgotPassword = async (req, res, next) => {
    const token = await crypto.randomBytes(20).toString('hex')
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.redirect('/guests/forgot-password')
    }
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000
    await user.save()

    const msg = {
        to: email,
        from: 'Minimum Admin <duyquangbtx@gmail.com>',
        subject: 'Minimum - Forgot Password / Reset',
        text: `You are receiving this because you (or someone else)
        have requested the reset of the password for your account.
          Please click on the following link, or copy and paste it
          into your browser to complete the process:
          http://${req.headers.host}/guests/reset/${token}
          If you did not request this, please ignore this email and
          your password will remain unchanged.`.replace(/		  /g, ''),
    }
    await sgMail.send(msg)
    res.redirect('/guests/forgot-password')
}

exports.getReset = async (req, res, next) => {
    const { token } = req.params
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        return res.redirect('/guests/forgot-password')
    }

    res.render('guest/reset', { token })
}

exports.putReset = async (req, res, next) => {
    const { token } = req.params;
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.redirect('/guests/forgot-password');
    }

    if (req.body.password === req.body.confirm) {
        user.password = req.body.password
        user.resetPasswordToken = null
        user.resetPasswordExpires = null
        bcrypt
        .genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                console.log("After hash: ", user)
                user.save(function (err) {
                    req.logIn(user, function (err) {
                        console.log(user)
                    })
                })
            })
        })
        // await user.save()
        // const login = util.promisify(req.login.bind(req))
        // await login(user)
    } else {
        return res.redirect(`/guests/reset/${token}`)
    }

    const msg = {
        to: user.email,
        from: 'Minimum Admin <duyquangbtx@gmail.com>',
        subject: 'Minimum - Password Changed',
        text: `Hello,
		  This email is to confirm that the password for your account has just been changed.
		  If you did not make this change, please hit reply and notify us at once.`.replace(/		  /g, '')
    };

    await sgMail.send(msg);
    res.redirect('/home')
}


exports.index = async (req, res, next) => {
    try {
        let noMatch = null
        const categories = await Category.find({})
        if (req.query.search) {

            const regex = new RegExp(escapeRegex(req.query.search), 'gi')

            Post
                .find({
                    status: 3,
                    title: regex
                }, (err, allPosts) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (allPosts.length < 1) {
                            noMatch = 'No posts match that query'
                        }
                        res.render('guest/search', {
                            posts: allPosts,
                            categories,
                            noMatch: noMatch
                        })
                    }
                })
        }

        else {
            //========================================
            const posts = await Post.find({
                status: 3
            })
                .populate('category')
                .populate('tag')
            const categories = await Category.find({})
            const tags = await Tag.find({})
            // 3-4 Most viewed Post
            let arrMostViewPosts = []
            const mostViewsPosts = await Post.find({
                status: 3
            }).sort({
                views: -1
            })

            for (let index = 0; index < 4; index++) {
                arrMostViewPosts.push(mostViewsPosts[index])
            }

            // Most viewed Post by Category
            let arrMostViewOfCategory = []
            const mostViewsPostsCategory = await Post.find({
                status: 3
            }).sort({
                views: -1
            }).populate('category')

            for (let index = 0; index < 10; index++) {
                arrMostViewOfCategory.push(mostViewsPostsCategory[index])
            }

            // Latest Posts
            const latestPosts = await Post.find({
                status: 3
            }).sort({
                createdAt: -1
            })


            res.render('guest/guestHome', {
                posts,
                categories,
                tags,
                latestPosts,
                arrMostViewPosts,
                arrMostViewOfCategory
            })
        }
    } catch (error) {
        next(error)
    }

}

exports.indexCategory = async (req, res, next) => {

    try {
        //==============================================
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

exports.indexTag = async (req, res, next) => {

    try {
        //==============================================
        const perPage = 10
        const page = req.query.page || 1
        const foundTag = await Tag.findOne({
            _id: req.params.id
        })


        Post
            .find({
                status: 3,
                tag: {
                    $in: [req.params.id]
                }
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then(posts => {
                Post
                    .count()
                    .then(postCount => {
                        Tag
                            .find({})
                            .then(tags => {
                                res.render('guest/guestTag', {
                                    posts,
                                    foundTag,
                                    tags,
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
        const foundPost = await Post.findOneAndUpdate({ _id: req.params.id }, {
            $inc: {
                views: 1
            }
        })
            .populate('category')
            .populate('writer')
            .populate({
                path: 'comments',
                populate: { path: 'user', model: 'User' }
            })

        const relatedPosts = await Post
            .find({
                status: 3,
                category: {
                    $in: [req.params.id]
                }
            })
        const categories = await Category.find({})
        console.log(foundPost)
        res.render('guest/guestPost', {
            relatedPosts,
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