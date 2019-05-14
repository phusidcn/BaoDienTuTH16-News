const express = require('express')
const guestController = require('../../controllers/guestController')
const router = express.Router()


router.get('/', guestController.index)

// app.get('/category', (req, res) => {
//     res.render('guest/guestCategory')
// })

// app.get('/post', (req, res) => {
//     res.render('guest/guestPost')
// })

// app.get('/login', (req, res) => {
//     res.render('authenticate/authen', {
//         layout: false
//     })
// })

module.exports = router