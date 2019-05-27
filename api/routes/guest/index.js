const express = require('express')
const Guest = require('../../models/Guest')
const bcrypt = require('bcryptjs')
const guestController = require('../../controllers/guestController')
const router = express.Router()

router.all('/*', guestController.all)
router.get('/', guestController.index)

// router.get('/category/:id', guestController.showCategory)
// router.get('/post/:id', guestController.showPost)

/* ----- */
router.get('/register', (req, res) => {
    res.render('guest/register', {
        layout: false
    })
})
router.post('/register', (req, res) => {
    

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
        res.render('guest/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email
        })
    } else {
        Guest.findOne({email: req.body.email}).then(guest => {
            if(!guest) {
                const newGuest = new Guest({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newGuest.password, salt, (err, hash) => {
                        newGuest.password = hash
        
                        newGuest.save().then(savedUser => {
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

})

router.get('/login', (req, res) => {
    res.render('guest/login', {
        layout: false
    })
})
router.post('/login', (req, res) => {
    res.send('POST /login')
})

// router.get('/profile', (req, res) => {
//     res.send('GET /profile')
// })
// router.put('/profile/:guest_id', (req, res) => {
//     res.send('PUT /profile/:guest_id')
// })

// router.get('/forgot', (req, res) => {
//     res.send('GET /forgot')
// })
// router.put('/forgot', (req, res) => {
//     res.send('PUT /forgot')
// })

// router.get('/reset/:token', (req, res, next) => {
//     res.send('GET /reset/:token');
// });

// router.put('/reset/:token', (req, res, next) => {
//     res.send('PUT /reset/:token');
// });

/* ----- */

module.exports = router