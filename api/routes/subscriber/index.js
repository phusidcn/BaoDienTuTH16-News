const express = require('express')
const subscriberController = require('../../controllers/subscriberController')
const router = express.Router()

router.get('/*', subscriberController.all)
router.get('/', subscriberController.index)

/* ----- */
router.get('/register', (req, res) => {
    //res.send('GET /REGISTER')
    res.render('subscriber/register',{
        layout: false
    })
})
router.post('/register', //(req, res) => {
    //res.send('POST /register')}
    subscriberController.register
)

router.get('/login', (req, res) => {
    //res.send('GET /LOGIN')
    res.render('subscriber/login',{
        layout: false
    })
})
router.post('/login', //(req, res) => {
    //res.send('POST /login')}
    subscriberController.login
)

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

// router.get('/category', subscriberController.showCategory)
// router.get('/post', subscriberController.showPost)
module.exports = router