const validationHandler = require('../validations/validationHandler')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { userAuthenticated } = require('./../../helpers/authentication')
const LocalStrategy = require('passport-local').Strategy


exports.all = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    next()
}

exports.register = async (req, res) => {
    res.render('editor/register', {
        layout: false
    })
}

exports.registerSubmit = async (req, res) => {
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
        res.render('editor/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email
        })
    } else {
        Editor.findOne({email: req.body.email}).then(editor => {
            if(!editor) {
                const newEditor = new Editor({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newEditor.password, salt, (err, hash) => {
                        newEditor.password = hash
        
                        newEditor.save().then(savedUser => {
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

exports.login = async (req, res) => {
    res.render('editor/login',{
        layout: false
    })
}

passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    Guest.findOne({ email: email }).then(guest => {
        if(!guest) {
            return done(null, false, { message: 'No guest found'})
        }
        bcrypt.compare(password, guest.password, (err, matched) => {
            if(err) {
                return err
            }

            if(matched) {
                return done(null, guest)
            } else {
                return done(null, false, { message: 'Incorrect password' })
            }
        })
    }) 
}))

passport.serializeUser((guest, done) => {
    done(null, guest._id)
})

passport.deserializeUser((id, done) => {
    Guest.findById(id, (err, guest) => {
        done(err, guest)
    })
})

exports.loginPost = async (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'editor/',
        failureFlash: true
    })(req, res, next)
}

exports.viewDraft = async (req, res) => {
    try {
        await res.render('editor/editor_view_draft')
    } catch (err) {
        console.log(err)
    }
}

exports.censorContent = async (req, res) =>{
    try {
         await res.render('editor/editor_censor_content')
    } catch (err) {
        console.log(err)
    }
}

exports.viewListContent = async (req, res) => {
    try {
        await res.render('editor/editor_view_list_content')
    } catch (err) {
        console.log(err)
    }
}