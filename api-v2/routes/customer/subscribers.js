const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/User')
const subscriberController = require('../../controllers/SubscriberController')

router.get('/forgot-password', subscriberController.indexForgot)
router.put('/forgot-password', subscriberController.putForgotPassword)
router.get('/reset/:token', subscriberController.getReset)
router.put('/reset/:token', subscriberController.putReset)

router.get('/login', (req, res) => {
    res.render('subscriber/login')
})

router.get('/register', (req, res) => {
    res.render('subscriber/register')
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
        res.render('subscriber/register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        User
            .findOne({ email: email }).then(user => {
                if (user) {
                    errors.push({ 
                        msg: 'Email already exists'
                    })
                    res.render('subscriber/register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                        role: 'SUBSCRIBER'
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
                                    res.redirect('/subscribers/login');
                                })
                                .catch(err => console.log(err));
                    });
                });
            }
        });
    }
})

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/subscribers/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/subscribers/login');
});

module.exports = router;

