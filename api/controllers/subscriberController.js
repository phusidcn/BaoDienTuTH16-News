const bcrypt = require('bcryptjs')
const passport = require('passport')
const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Subcriber = require('./../models/Subscriber')
const LocalStrategy = require('passport-local').Strategy

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

exports.register = (res, req) => {
    let errors = []
    if(!res.body.name) {
        errors.push({
            message: 'Please type your user name'
        })
    }
    if (!res.body.email) {
        errors.push({
            message: 'Please type your email'
        })
    }
    if (!res.body.password) {
        errors.push({
            message: 'Please type your password'
        })
    }
    if (!res.body.password != res.body.passwrod2) {
        errors.push({
            message: 'Please re-confirm your password'
        })
    }

    if (errors.length > 0) {
        res.render('subcriber/register', {
            errors: errors,
            name: req.body.name,
            email: req.body,email
        })
    } else {
        Subcriber.findOne({email: req.body.email}).then(subcriber=>{
            if(!subcriber){
                const newSubcriber = new Subcribder({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err,salt)=> {
                    if (err){
                        console.log(err)
                    }
                    bcrypt.hash(newSubcriber.password, salt, (err,hash) => {
                        if (err) {
                            console.log(err)
                        }
                        newSubcriber.password = hash
                        newSubcriber.save().then(savedWriter =>{
                            req.flash('success_message','You are registered')
                            res.redirect('/subcriber/login')
                        })
                    })
                })
            }
        })
    }
}

exports.login = (req, res) => {
    passport.authenticate('local',{
        successRedirect: '/subcriber',
        failureRedirect: '/subcriber/login',
        failureFlash: false
    })(req, res, next)
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