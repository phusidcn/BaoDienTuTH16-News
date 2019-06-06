const configs = require('../config')
const Post = require('../models/Post')
const Guest = require('../models/Guest')
const User = require('../models/User')
const Category = require('../models/Category')
const Tag = require('../models/Tag')

const bcrypt = require('bcryptjs')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

exports.all = (req, res, next) => {
    req.app.locals.layout = 'guest'
    next()
}

exports.about = (req, res) => {
    res.render('guest/about')
}

exports.contact = (req, res) => {
    res.render('guest/contact')
}

exports.singlePost = (req, res) => {
    res.render('guest/guestPost')
}

exports.index = (req, res) => {
    console.log(req.user)
    return res.render('guest/guestHome')
    // Post
    //     .find({})
    //     .then(() => {
    //         res.render('guest/guestHome')
    //     })
        // .populate('writer')
        // .exec((errors, posts) => {
        //     if (errors) {
        //         console.log(errors)
        //     }
        //     res.render('guest/guestHome', {
        //         posts: posts
        //     })
        // })
}

exports.showPost = (req, res, next) => {
    Post
        .findOne({ id: req.params.id })
        .populate('writer')
        .exec((err, post) => {
            if (err) console.log(err)
            res.render('guest/guestPost', {
                post: post
            })
        })
}

exports.register = (req, res) => {
    const { 
        name, 
        email, 
        password, 
        password2 
    } = req.body

    const userType = "Guest"

    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ 
            msg: 'Please enter all fields' 
        });
    }

    if (password != password2) {
        errors.push({ 
            msg: 'Passwords do not match' 
        });
    }

    if (password.length < 6) {
        errors.push({ 
            msg: 'Password must be at least 6 characters' 
        });
    }

    if (errors.length > 0) {
        res.render('guest/register', {
            errors,
            name,
            email,
            password,
            password2,
        });
    } else {
        User
            .findOne({ 
                email: email,
                typeUser: userType
            })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email already exists' });
                    res.render('guest/register', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                    });
                } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    userType
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
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





/************************************************ */
exports.google = (req, res, next) => {
    passport.authenticate('google',
        { scope: ['profile', 'email'] })(req, res, next)
}

exports.facebook = (req, res, next) => {
    passport.authenticate('facebook')(req, res, next)
}



/* Passport Local */


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
