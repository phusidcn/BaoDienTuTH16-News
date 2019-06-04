const bcrypt = require('bcryptjs')
const passport = require('passport')
const Editor = require('./../models/Editor')

exports.all = (req, res, next) => {
    req.app.locals.layout = 'editor'
    next()
}

exports.index = (req, res) => {
    res.render('editor/index')
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
        res.render('editor/register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: false
        });
    } else {
        Editor.findOne({ email: email }).then(editor => {
            if (editor) {
                errors.push({ msg: 'Email already exists' });
                res.render('editor/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    layout:false
                });
            } else {
                const newEditor = new Editor({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newEditor.password, salt, (err, hash) => {
                        if (err) throw err;
                        newEditor.password = hash;
                        newEditor
                            .save()
                            .then(editor => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/editor/login');
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
        successRedirect: '/editor',
        failureRedirect: '/editor/login',
        failureFlash: true
    })(req, res, next)
}

