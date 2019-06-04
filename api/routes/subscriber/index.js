const express = require('express')
const subscriberController = require('../../controllers/subscriberController')
const router = express.Router()

router.all('/*', subscriberController.all)
router.get('/', subscriberController.index)

/* ----- */

router.get('/register', (req, res) => {
    res.render('subcriber/register', {
        layout: false
    })
})

router.get('/login', (res,req) => {
    res.render('subcriber/login', {
        layout: false
    })
})

router.post('/register',subscriberController.register)
router.post('/login',subscriberController.login)

module.exports = router