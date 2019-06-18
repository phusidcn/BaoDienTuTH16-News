const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/User')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const _ = require('lodash')
const async = require('async')
const adminController = require('../../controllers/AdminController')

router.get('/login' ,(req, res) => {
    res.render('admin/login', {
        layout: false,
    })
})

router.get('/register', (req, res) => {
    res.render('admin/register', {
        layout: false
    })
})

// Register
router.post('/register', (req, res) => {
    const { 
        name, 
        email, 
        password, 
        password2 
    } = req.body
    
    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ 
            msg: 'Please enter all fields' 
        })
    }

    if (password != password2) {
        errors.push({ 
            msg: 'Passwords do not match' 
        })
    }

    if (password.length < 6) {
        errors.push({ 
            msg: 'Password must be at least 6 characters' 
        })
    }

    if (errors.length > 0) {
        res.render('admin/register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: false
        })
    } else {
        User
            .findOne({ email: email }).then(user => {
                if (user) {
                    errors.push({ 
                        msg: 'Email already exists'
                    })
                    res.render('admin/register', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                        layout: false
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                        role: 'ADMIN'
                });

                bcrypt
                    .genSalt(10, (err, salt) => {
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
                                    res.redirect('/employee/admins/login');
                                })
                                .catch(err => console.log(err));
                    });
                });
            }
        });
    }
})

router.get('/forgot-password', adminController.indexForgot)
router.put('/forgot-password', adminController.putForgotPassword)
router.get('/reset/:token', adminController.getReset)
router.put('/reset/:token', adminController.putReset)

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('admin-local', {
        successRedirect: '/employee/admins/dashboard/profile',
        failureRedirect: '/employee/admins/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/employee/admins/login');
});

module.exports = router;

