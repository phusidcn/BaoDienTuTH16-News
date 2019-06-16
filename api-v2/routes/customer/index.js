const express = require('express')
const colors = require('colors')
const router = express.Router()
const common = require('../../helpers/common')
const guestController = require('../../controllers/GuestController')
const subscriberController = require('../../controllers/SubscriberController')

// Main Page
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'guest'
    next()
})
router.get('/', guestController.index)
router.get('/category/:id', guestController.indexCategory)
router.get('/contact', guestController.contact)
router.get('/about', guestController.about)
router.post('/comment', guestController.comment)

router.get('/:id', guestController.show)



module.exports = router