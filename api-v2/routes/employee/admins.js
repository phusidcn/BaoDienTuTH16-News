const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/User')

router.get('/login', (req, res) => {
    res.render('admin/login', {
        layout: false
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
            password2
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
                        password2
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

router.get('/forgot', (req, res) => {
    res.render('admin/forgot', {
        layout: false
    })
})

router.post('/forgot', (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString('hex')
                done(err, token)
            })
        },

        function (token, done) {
            User.findOne({
                email: req.body.email
            })
                .then((user) => {
                    if (!user) {
                        req.flash('error_msg', 'No account with that email.')
                        return res.redirect('/employee/admins/forgot')
                    }

                    user.resetPasswordToken = token
                    user.resetPasswordExpires = Date.now() + 3600000

                    user.save((err) => {
                        done(err, token, user)
                    })
                })
                .catch(err => {
                    if (err) console.log(err)
                })
        },

        function (token, user, done) {
            let smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'phusidcn@gmail.com',
                    pass: 'Aceofsky99669965'
                }
            })

            let mailOptions = {
                from: 'phusidcn@gmail.com', // sender address
                to: 'quangle.hcmus@gmail.com', // list of receivers
                subject: 'Reset Password', // Subject line
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/employee/admins/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }

            smtpTransport.sendMail(mailOptions, (err) => {
                console.log('Mail sent')
                req.flash('success_msg', 'An email has been sent to ' + user.email)
                done(err, 'done')
            })
        }
    ], function (err) {
        if (err) return next(err)
        res.redirect('/employee/admins/forgot')
    })
})

router.get('/reset/:token', (req, res) => {
    User
        .findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        }, (err, user) => {
            if (!user) {
                req.flash('error_msg', 'Password reset token is invalid or expired')
                return res.redirect('/employee/admins/forgot')
            }
            res.render('admin/reset', {
                token: req.params.token,
                layout: false
            })
        })
})

router.post('/reset/:token', (req, res) => {
    async.waterfall([
        function (done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            }, (err, user) => {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or expired')
                    return res.redirect('/employee/admins/forgot')
                }

                if (req.body.password === req.body.confirm) {
                   
                    user.password = req.body.password
                    user.resetPasswordToken = undefined
                    user.resetPasswordExpires = undefined

                    bcrypt
                    .genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                        })
                    })
                    user.save(function (err) {
                        req.logIn(user, function (err) {
                            done(err, user)
                        })
                    })
                } else {
                    req.flash("error_msg", "Passwords do not match.")
                    return res.redirect('/employee/admins/forgot')
                }
            }
            )
        },

        function (user, done) {
            let smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'quangle.hcmus@gmail.com',
                    pass: 'Duyquang!2006'
                }
            })

            let mailOptions = {
                from: 'quangle.hcmus@gmail.com', // sender address
                to: 'duyquangbtx@gmail.com', // list of receivers
                subject: 'Your password has been changed', // Subject line
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            }

            smtpTransport.sendMail(mailOptions, (err) => {
                console.log('Mail sent')
                req.flash('success_msg', 'Success! Your password has been changed')
                done(err, 'done')
            })
        }
    ], function (err) {
        res.redirect('/employee/admins/login')
    })
})


// Login
router.post('/login', (req, res, next) => {
    const adminEmail = req.body.email
    const role = adminEmail.substring(0, adminEmail.lastIndexOf("@") -1)
    if(role !== "admin") {
        req.flash('error_msg', 'You are not admin')
        return res.redirect('/employee/admins/login')
    }
    passport.authenticate('local', {
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

