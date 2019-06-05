const express = require('express')
const subscriberController = require('../../controllers/subscriberController')
const router = express.Router()

router.get('/*', subscriberController.all)
router.get('/', subscriberController.index)
router.get('/about', subscriberController.about)
router.get('/contact', subscriberController.contact)
router.get('/post', subscriberController.singlePost)

/* ----- */
router.get('/register', (req, res) => {
    res.render('subscriber/register')
})
router.get('/login', (req, res) => {
    res.render('subscriber/login')
})
router.post('/register', subscriberController.register)
router.post('/login', subscriberController.login)

module.exports = router