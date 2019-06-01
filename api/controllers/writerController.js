const Post = require('../models/Post')
const Writer = require('../models/Writer') 
const validationHandler = require('../validations/validationHandler')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

exports.all = (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('writer/index')
    } catch (err) {
        console.log(err)
    }
}

exports.register = (req, res) => {
    let errors = []

    if(!req.body.name) {
        errors.push({
            message: 'Please input your name'
        })
    }

    if(!req.body.email) {
        errors.push({
            message: 'Please input your email'
        })
    }

    if(!req.body.password) {
        errors.push({
            message: 'Please input your password'
        })
    }

    if(req.body.password !== req.body.password2) {
        errors.push({
            message: 'Password not match'
        })
    }

    if(errors.length > 0) {
        res.render('writer/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            layout: false
        })
    } else {
        Writer.findOne({email: req.body.email}).then(writer => {
            if(!writer) {
                const newWriter = new Writer({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newWriter.password, salt, (err, hash) => {
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


passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    Writer.findOne({ email: email }).then(writer => {
        if(!writer) {
            return done(null, false, { message: 'No guest found'})
        }
        console.log(writer)
        bcrypt.compare(password, writer.password, (err, matched) => {
            if(err) {
                return err
            }

            if(matched) {
                return done(null, writer)
            } else {
                return done(null, false, { message: 'Incorrect password' })
            }
        })
    }) 
}))

passport.serializeUser((writer, done) => {
    done(null, writer._id)
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


exports.store = async (req, res, next) => {
    try {
        validationHandler(req)

        let post = new Post()
        // post.image = req.file.image
        post.title = req.body.title
        post.category = req.body.category
        post.tag = req.body.tag
        post.content = req.body.content
        post = await post.save().then(() => {
            res.redirect('/writer/post') 
        })
    } catch (error) {
        next(error)
    }
}

// ==========================================
exports.editDenied = async (req, res) => {
    try {
        await res.render('writer/writer_edit_denied_content')
    } catch (err) {
        console.log(err)
    }
}

exports.editWaiting = async (req, res) => {
    try {
        await res.render('writer/writer_edit_waiting_content')
    } catch (err) {
        console.log(err)
    }
}

exports.viewCensored = async (req, res) => {
    try {
        await res.render('writer/writer_view_censored')
    } catch (err) {
        console.log(err)
    }
}


exports.viewDenied = async (req, res) => {
    try {
        await res.render('writer/writer_view_denied')
    } catch (err) {
        console.log(err)
    }
}

exports.viewPublished = async (req, res) => {
    try {
        await res.render('writer/writer_view_published')
    } catch (err) {
        console.log(err)
    }
}

exports.viewWaiting = async (req, res) => {
    try {
        let posts = await Post.find({})
        res.render('writer/writer_view_waiting', {
            posts: posts
        })
    } catch (err) {
        console.log(err)
    }
}