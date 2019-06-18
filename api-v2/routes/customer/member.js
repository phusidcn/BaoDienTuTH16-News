const express = require('express')
const router = express.Router()
const subscriberController = require('../../controllers/SubscriberController')
const {
    subscriberEnsureAuthenticated
} = require('../../helpers/auth')
// Main Page
router.all('/*', subscriberEnsureAuthenticated ,(req, res, next) => {
    req.app.locals.layout = 'subscriber'
    next()
})

// GUESTS
router.get('/', subscriberController.index)
router.get('/category/:id', subscriberController.indexCategory)
router.get('/tag/:id', subscriberController.indexTag)
router.get('/contact', subscriberController.contact)
router.get('/about', subscriberController.about)
router.post('/comment', subscriberController.comment)

router.get('/:id', subscriberController.show)

module.exports = router