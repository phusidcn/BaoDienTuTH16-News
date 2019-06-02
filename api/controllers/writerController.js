const bcrypt = require('bcryptjs')
const passport = require('passport')
const Writer = require('./../models/Writer')
const LocalStrategy = require('passport-local').Strategy


exports.all = (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
}

exports.index = (req, res) => {
    res.render('writer/index')
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
                    if(err) console.log(err)
                    bcrypt.hash(newWriter.password, salt, (err, hash) => {
                        if(err) console.log(err)
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

