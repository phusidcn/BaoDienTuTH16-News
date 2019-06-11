const express = require('express')
const router = express.Router()
const guestController = require('../../controllers/GuestController')

// Main Page
// router.all('/*', (req, res, next) => {
//     req.app.locals.layout = 'guest'
//     next()
// })
router.get('/', guestController.index)
router.get('/:id', guestController.show)
// // router.get('/:page', guestController.paginate)

module.exports = router