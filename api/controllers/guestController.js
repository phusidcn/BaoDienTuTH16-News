const configs = require('../config')
const Post = require('../models/Post')
const Guest = require('../models/Guest')
const Category = require('../models/Category')
const Tag = require('../models/Tag')

const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

exports.all = async (req, res, next) => {
    req.app.locals.layout = 'guest'
    next()
}

exports.index = (req, res) => {
    Post.find({})
        .populate('writer')
        .exec((errors, posts) => {
            if(errors) {
                console.log(errors)
            }
            res.render('guest/guestHome', {
                posts: posts
            })
        })
}

exports.showPost = (req, res, next) => {
    Post.findOne({id: req.params.id})
        .populate('writer')
        .exec((err, post) => {
            if(err) console.log(err)
            res.render('guest/guestPost', {
                post: post
            })
        })
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
        res.render('guest/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            layout: false
        })
    } else {
        Guest.findOne({email: req.body.email}).then(guest => {
            if(!guest) {
                const newGuest = new Guest({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newGuest.password, salt, (err, hash) => {
                        newGuest.password = hash
        
                        newGuest.save().then(savedUser => {
                            req.flash('success_message', 'You are registered successfully. Please Log in')
                            res.redirect('/login')
                        })
                    })
                })
            } else {
                req.flash('error_message', 'Email is already registered')
                res.redirect('/register')
            }
        })
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logOut()
    res.redirect('/login')
}

exports.google = (req, res, next) => {
    passport.authenticate('google', 
        {scope: ['profile', 'email']})(req, res, next)
}

exports.facebook = (req, res, next) => {
    passport.authenticate('facebook')(req, res, next)
}



/* Passport Local */

passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    // Guest.findOne({ email: email }).then(guest => {
    //     if(!guest) {
    //         return done(null, false, { message: 'No guest found'})
    //     }
    //     bcrypt.compare(password, guest.password, (err, matched) => {
    //         if(err) {
    //             return err
    //         }

    //         if(matched) {
    //             return done(null, guest)
    //         } else {
    //             return done(null, false, { message: 'Incorrect password' })
    //         }
    //     })
    // }) 
    console.log(email)
}))

passport.serializeUser((guest, done) => {
    done(null, guest.id)
})

passport.deserializeUser((id, done) => {
    Guest.findById(id, (err, guest) => {
        done(err, guest)
    })
})

/* Passport Google */
passport.use(
    new GoogleStrategy({
        clientID: configs.googleClientID,
        clientSecret: configs.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, cb) => {
        console.log(accessToken)
        console.log(profile)
    })
)

/* Passport facebook */
passport.use(
    new FacebookStrategy({
        clientID: configs.facebookClientID,
        clientSecret: configs.facebookClientSecret,
        callbackURL: '/auth/facebook/callback'
    }, (accessToken, refreshToken, profile, cb) => {
        Guest.create({ facebookId: profile.id }, (err, user) => {
            return cb(err, user)
        })
    })
)
