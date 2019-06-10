const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const hbs = require('nodemailer-express-handlebars')
const email = process.env.MAILER_EMAIL_ID || 'duyquangbtx@gmail.com'
const pass = process.env.MAILER_PASSWORD || 'quanglqd!2006'
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const _ = require('lodash')
const async = require('async')
const jwt = require('jsonwebtoken')
const path = require('path')

// Configure nodemailer
// const smtpTransport = nodemailer.createTransport({
//     service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
//     auth: {
//         user: email,
//         pass: pass
//     }
// })

// const handlebarsOptions = {
//     viewEngine: 'handlebars',
//     viewPath: path.resolve('./api-v2/templates/'),
//     extName: '.html'
// }

// smtpTransport.use('compile', hbs(handlebarsOptions))

// exports.forgotPassword = (req, res) => {
//     async.waterfall([
//         function (done) {
//             User.findOne({
//                 email: req.body.email
//             }).exec(function (err, user) {
//                 if (user) {
//                     done(err, user);
//                 } else {
//                     done('User not found.');
//                 }
//             });
//         },
//         function (user, done) {
//             // create the random token
//             crypto.randomBytes(20, function (err, buffer) {
//                 var token = buffer.toString('hex');
//                 done(err, user, token);
//             });
//         },
//         function (user, token, done) {
//             User
//                 .findByIdAndUpdate(
//                     { _id: user._id },
//                     { 
//                         reset_password_token: token, 
//                         reset_password_expires: Date.now() + 86400000 
//                     },
//                     { upsert: true, new: true }
//                 )
//                 .exec(function (err, new_user) {
//                     done(err, token, new_user);
//                 });
//         },
//         function (token, user, done) {
//             var data = {
//                 to: user.email,
//                 from: email,
//                 template: 'forgot-password-email',
//                 subject: 'Password help has arrived!',
//                 context: {
//                     url: 'http://localhost:3000/employee/writers/reset-password?token=' + token,
//                     name: user.name
//                 }
//             };

//             smtpTransport.sendMail(data, function (err) {
//                 if (!err) {
//                     return res.json({ message: 'Kindly check your email for further instructions' });
//                 } else {
//                     return done(err);
//                 }
//             });
//         }
//     ], function (err) {
//         return res.status(422).json({ message: err });
//     });
// }

// exports.resetPassword = function (req, res, next) {
//     User.findOne({
//         reset_password_token: req.body.token,
//         reset_password_expires: {
//             $gt: Date.now()
//         }
//     }).exec(function (err, user) {
//         if (!err && user) {
//             if (req.body.newPassword === req.body.verifyPassword) {
//                 user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
//                 user.reset_password_token = undefined;
//                 user.reset_password_expires = undefined;
//                 user.save(function (err) {
//                     if (err) {
//                         return res.status(422).send({
//                             message: err
//                         });
//                     } else {
//                         var data = {
//                             to: user.email,
//                             from: email,
//                             template: 'reset-password-email',
//                             subject: 'Password Reset Confirmation',
//                             context: {
//                                 name: user.name
//                             }
//                         };

//                         smtpTransport.sendMail(data, function (err) {
//                             if (!err) {
//                                 return res.json({ message: 'Password reset' });
//                             } else {
//                                 return done(err);
//                             }
//                         });
//                     }
//                 });
//             } else {
//                 return res.status(422).send({
//                     message: 'Passwords do not match'
//                 });
//             }
//         } else {
//             return res.status(400).send({
//                 message: 'Password reset token is invalid or has expired.'
//             });
//         }
//     });
// };


exports.updateProfile = (req, res) => {
    const {
        email,
        password,
        name
    } = req.body

    User
        .findOne({
            _id: req.params.id
        })
        .then(writer => {
            writer.email = email
            writer.name = name
            writer.password = password

            bcrypt
                .genSalt(10, (err, salt) => {
                    bcrypt.hash(writer.password, salt, (err, hash) => {
                        if (err) throw err
                        writer.password = hash
                        writer
                            .save()
                            .then(updatedWriter => {
                                req.flash('success_msg', `Account ${updatedWriter.name} was successfully updated`);
                                res.redirect('/employee/writers/dashboard/profile')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                })
        })
}

exports.index = (req, res, next) => {
    try {
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10
        const page = req.query.page ? parseInt(req.query.page) : 1
        Post
            .find({
                writer: {
                    $in: [req.user.id]
                }
            })
            .populate('category')
            .sort({ createdAt: -1 })
            .skip((page - 1) * pagination)
            .limit(pagination)
            .exec((err, posts) => {
                if (err) console.log(err)
                res.render('writer/posts/index', {
                    posts
                })
            })
        console.log(req.user)
    } catch (err) {
        next(err)
    }
}

exports.indexCreate = (req, res) => {
    Category
        .find({})
        .then(categories => {
            res.render('writer/posts/create', {
                categories
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.create = (req, res) => {
    const {
        title,
        content
    } = req.body

    let errors = []

    if (!title || !content) {
        errors.push({
            msg: 'Please add all fields'
        })
    }

    if (errors.length > 0) {
        res.render('writer/posts/create', {
            title,
            content,
            errors: errors
        })
    } else {
        let filename = ''
        if (!isEmpty(req.files)) {
            let file = req.files.image
            filename = file.name + '-' + Date.now()

            file.mv('./public/uploads/' + filename, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        const newPost = new Post({
            title: req.body.title,
            image: filename,
            status: 0,
            like: 0,
            category: req.body.category,
            tag: req.body.tag,
            premium: req.body.premium,
            subContent: req.body.subContent,
            content: req.body.content,
            writer: req.user.id
        })

        newPost.save()
            .then(savedPost => {
                res.redirect('/employee/writers/dashboard/index')
            })
            .catch(err => {
                console.log(err)
            });
    }
}

exports.indexUpdate = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            Category
                .find({})
                .then(categories => {
                    res.render('writer/posts/edit', {
                        post,
                        categories
                    })
                })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.update = (req, res) => {
    const {
        title,
        status,
        content,
        premium,
        category
    } = req.body

    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            post.title = title
            post.status = status
            post.content = content
            post.premium = premium
            post.category = category

            post
                .save()
                .then(updatedPost => {
                    req.flash('success_msg', `Post ${updatedPost.title} was successfully updated`);
                    res.redirect('/employee/writers/dashboard/index')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.delete = (req, res) => {
    Post
        .deleteOne({
            _id: req.params.id
        })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_msg', 'Post was successfully deleted');
                res.redirect('/employee/writers/dashboard/index')
            })
        })
}

exports.approved = (req, res) => {
    const approved_status = 1
    Post
        .find({
            status: approved_status,
            writer: {
                $in: [req.user.id]
            }
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/approved', {
                posts: posts
            })
        })
}

exports.published = (req, res) => {
    const published_status = 3
    Post
        .find({
            status: published_status,
            writer: {
                $in: [req.user.id]
            }
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/published', {
                posts: posts
            })
        })
}

exports.waiting = (req, res) => {
    const waiting_approved_status = 0
    Post
        .find({
            status: 0,
            writer: {
                $in: [req.user.id]
            }
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/waiting-approved', {
                posts: posts
            })
        })
}

exports.indexUpdateWaiting = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            Category
                .find({})
                .then(categories => {
                    res.render('writer/posts/edit-waiting-approved', {
                        post,
                        categories
                    })
                })
        })
}

exports.updateWaiting = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            post.title = req.body.title
            post.status = 0
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category
            post.writer = req.user.id

            post
                .save()
                .then(updatedPost => {
                    req.flash('success_msg', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/employee/writers/waiting')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.deleteWaiting = (req, res) => {
    Post
        .deleteOne({ _id: req.params.id })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_msg', 'Post was successfully deleted');
                res.redirect('/employee/writers/waiting')
            })
        })
}

exports.rejected = (req, res) => {
    const rejected_status = 2
    Post
        .find({
            status: rejected_status
        })
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/rejected', {
                posts
            })
        })
}

exports.indexUpdateRejected = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            Category
                .find({})
                .then(categories => {
                    res.render('writer/posts/edit-rejected', {
                        post,
                        categories
                    })
                })
        })
}

exports.updateRejected = (req, res) => {
    Post
        .findOne({
            _id: req.params.id
        })
        .then(post => {
            post.title = req.body.title
            post.status = 2
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post
                .save()
                .then(updatedPost => {
                    req.flash('success_msg', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/employee/writers/rejected')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.deleteRejected = (req, res) => {
    Post
        .deleteOne({
            _id: req.params.id
        })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_msg', 'Post was successfully deleted');
                res.redirect('/employee/writers/rejected')
            })
        })
}