const bcrypt = require('bcryptjs')
const passport = require('passport')
const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Writer = require('./../models/Writer')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const LocalStrategy = require('passport-local').Strategy


exports.all = (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
}

exports.index = (req, res) => {
    res.render('writer/index')
}

/* ============== Authenticate =================*/

exports.register = (req, res) => {
    let errors = []

    if (!req.body.name) {
        errors.push({
            message: 'Please input your name'
        })
    }

    if (!req.body.email) {
        errors.push({
            message: 'Please input your email'
        })
    }

    if (!req.body.password) {
        errors.push({
            message: 'Please input your password'
        })
    }

    if (req.body.password !== req.body.password2) {
        errors.push({
            message: 'Password not match'
        })
    }

    if (errors.length > 0) {
        res.render('writer/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            layout: false
        })
    } else {
        Writer.findOne({ email: req.body.email }).then(writer => {
            if (!writer) {
                const newWriter = new Writer({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) console.log(err)
                    bcrypt.hash(newWriter.password, salt, (err, hash) => {
                        if (err) console.log(err)
                        newWriter.password = hash

                        newWriter.save().then(savedUser => {
                            req.flash('success_message', 'You are registered successfully. Please Log in')
                            res.redirect('/writer/login')
                        })
                    })
                })
            } else {
                req.flash('error_message', 'Email is already registered')
                res.redirect('/writer/register')
            }
        })
    }
}


passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    Writer.findOne({ email: email }).then(writer => {
        if (!writer) {
            return done(null, false, { message: 'No guest found' })
        }
        bcrypt.compare(password, writer.password, (err, matched) => {
            if (err) {
                return err
            }

            if (matched) {
                return done(null, writer)
            } else {
                return done(null, false, { message: 'Incorrect password' })
            }
        })
    })
}))

passport.serializeUser((writer, done) => {
    done(null, writer.id)
})

passport.deserializeUser((id, done) => {
    Writer.findById(id, (err, writer) => {
        done(err, writer)
    })
})

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/writer',
        failureRedirect: '/writer/login',
        failureFlash: true
    })(req, res, next)
}
/* ======================================= */

exports.post = (req, res) => {
    Post.find({})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/index', {
                posts: posts
            })
        })
}

exports.create = (req, res) => {
    let errors = []

    if (!req.body.title) {
        errors.push({ message: 'Please add title' })
    }

    if (!req.body.content) {
        errors.push({ message: 'Please add content' })
    }

    if (errors.length > 0) {
        res.render('writer/posts/create', {
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
            category: req.body.category,
            status: req.body.status,
            tag: req.body.tag,
            premium: req.body.premium,
            content: req.body.content
        })

        newPost.save()
            .then(savedPost => {
                res.redirect('/writer/post')
            })
            .catch(err => {
                console.log(err)
            });
    }
}

exports.edit = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.status = req.body.status
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post.save()
                .then(updatedPost => {
                    req.flash('success_message', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/writer/post')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.delete = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_message', 'Post was successfully deleted');
                res.redirect('/writer/post')
            })
        })
}

exports.approvedPost = (req, res) => {
    const approved_status = 1
    Post.find({ status: approved_status})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/approved', {
                posts: posts
            })
        })
}

exports.waitingApprovedPost = (req, res) => {
    const waiting_approved_status = 0
    Post.find({ status: waiting_approved_status})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/waiting-approved', {
                posts: posts
            })
        })
}

exports.editWaitingApproved = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.status = 0
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post.save()
                .then(updatedPost => {
                    req.flash('success_message', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/writer/post/waiting-approved')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}