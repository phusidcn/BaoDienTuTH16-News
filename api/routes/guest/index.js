const express = require('express')
const guestController = require('../../controllers/guestController')
const router = express.Router()

router.all('/*', guestController.all)
router.get('/', guestController.index)

router.get('/category/:id', guestController.showCategory)
router.get('/post/:id', guestController.showPost)
/* ----- */
router.get('/register', (req, res) => {
    res.send('GET /REGISTER')
})
router.post('/register', (req, res) => {
    res.send('POST /register')
})

router.get('/login', (req, res) => {
    res.send('GET /LOGIN')
})
router.post('/login', (req, res) => {
    res.send('POST /login')
})

router.get('/profile', (req, res) => {
    res.send('GET /profile')
})
router.put('/profile/:guest_id', (req, res) => {
    res.send('PUT /profile/:guest_id')
})

router.get('/forgot', (req, res) => {
    res.send('GET /forgot')
})
router.put('/forgot', (req, res) => {
    res.send('PUT /forgot')
})

router.get('/reset/:token', (req, res, next) => {
    res.send('GET /reset/:token');
});

router.put('/reset/:token', (req, res, next) => {
    res.send('PUT /reset/:token');
});

/* ----- */

module.exports = router