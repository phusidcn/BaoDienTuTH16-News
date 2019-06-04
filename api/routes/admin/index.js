const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)
router.get('/', adminController.index)

router.get('/login', (req, res) => {
    res.render('admin/login', {
        layout: false
    })
})
router.get('/register', (req, res) => {
    res.render('admin/register', {
        layout: false
    })
})

router.post('/login', adminController.login)
router.post('/register', adminController.register)

module.exports = router
