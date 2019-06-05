const express = require('express')
const guestController = require('../../controllers/guestController')
const router = express.Router()

router.all('/*', guestController.all)
router.get('/', guestController.index)
router.get('/about', guestController.about)
router.get('/contact', guestController.contact)
router.get('/post', guestController.singlePost)

router.get('/register', (req, res) => {
    res.render('guest/register')
})
router.get('/login', (req, res) => {
    res.render('guest/login')
})
router.post('/register', guestController.register)
router.post('/login', guestController.login)
router.get('/logout', guestController.logout)

// router.get('/auth/google', guestController.google)
// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/');
//     });

// router.get('/auth/facebook', guestController.facebook)
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     function(req, res) {
//         res.redirect('/')
//     }
// )

module.exports = router