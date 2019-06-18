const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(require('../config/config').sendGridID)
const User = require('../models/User')
const Category = require('../models/Category')
const crypto = require('crypto')
const Post = require('../models/Post')
const escapeRegex = require('../helpers/regex-escape')

exports.indexForgot = (req, res) => {
    res.render('subscriber/forgot')
}

exports.putForgotPassword = async (req, res, next) => {
    const token = await crypto.randomBytes(20).toString('hex')
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.redirect('/subscribers/forgot-password')
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
          http://${req.headers.host}/subscribers/reset/${token}
          If you did not request this, please ignore this email and
          your password will remain unchanged.`.replace(/		  /g, ''),
    }
    await sgMail.send(msg)
    res.redirect('/subscribers/forgot-password')
}

exports.getReset = async (req, res, next) => {
    const { token } = req.params
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        return res.redirect('/subscribers/forgot-password')
    }

    res.render('subscriber/reset', { token })
}

exports.putReset = async (req, res, next) => {
    const { token } = req.params;
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.redirect('/subscribers/forgot-password');
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
        return res.redirect(`/subscribers/reset/${token}`)
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