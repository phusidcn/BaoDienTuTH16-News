const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const request = require('request')

const User = require('../../models/User')
const guestController = require('../../controllers/GuestController')

router.get('/forgot-password', guestController.indexForgot)
router.put('/forgot-password', guestController.putForgotPassword)
router.get('/reset/:token', guestController.getReset)
router.put('/reset/:token', guestController.putReset)

router.get('/login', (req, res) => {
    res.render('guest/login')
})

router.get('/register', (req, res) => {
    res.render('guest/register')
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
        res.render('writer/register', {
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
                    res.render('guest/register', {
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
                        role: 'GUEST'
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
                                        res.redirect('/guests/login');
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
    if (req.body['g-recaptcha-response'] === undefined ||
        req.body['g-recaptcha-response'] === '' ||
        req.body['g-recaptcha-response'] === null) {
        return res.redirect('/guests/login')
    }
    const secretKey = "6LeHXKkUAAAAAL6wNIGNshyzPLqtUgC1mbrsNcP7"
    let verificationUrl =
        "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey
        + "&response=" + req.body['g-recaptcha-response']
        + "&remoteip=" + req.connection.remoteAddress

    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return res.redirect('/guests/login')
        }
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/guests/login',
            failureFlash: true
        })(req, res, next)
    })
})

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/guests/login');
});

module.exports = router;

