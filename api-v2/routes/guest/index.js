const express = require('express')
const router = express.Router()
const guestController = require('../../controllers/GuestController')

// Main Page
// Main Page
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'guest'
    next()
})
router.get('/', guestController.index)
// // router.get('/:page', guestController.paginate)
// router.get('/:id', guestController.show)

module.exports = router