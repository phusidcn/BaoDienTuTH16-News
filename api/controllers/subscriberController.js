const configs = require('../config')
const Post = require('../models/Post')
const Subscriber = require('../models/Subscriber')
const Category = require('../models/Category')
const Tag = require('../models/Tag')

const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

exports.all = (req, res, next) => {
    req.app.locals.layout = 'subscriber'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('subscriber/subscriberHome')
    } catch (err) {
        console.log(err)
    }
}

exports.register = (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('/register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: false
        });
    } else {
        Subscriber.findOne({ email: email }).then(subscriber => {
            if (subscriber) {
                errors.push({ msg: 'Email already exists' });
                res.render('subscriber/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    layout:false
                });
            } else {
                const newSubscriber = new Subscriber({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newSubscriber.password, salt, (err, hash) => {
                        if (err) throw err;
                        newSubscriber.password = hash;
                        newSubscriber
                            .save()
                            .then(subscriber => {
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
    passport.authenticate('subscriberLocal', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logOut()
    res.redirect('/login')
}

exports.showCategory = async (req, res) => {
    try {
        await res.render('subscriber/subscriberCategory')
    } catch (err) {
        console.log(err)
    }
}

exports.showPost = async (req, res) => {
    try {
        await res.render('subscriber/subscriberPost')
    } catch (err) {
        console.log(err)
    }
}