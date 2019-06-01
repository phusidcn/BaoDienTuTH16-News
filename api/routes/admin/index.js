const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)
router.get('/', adminController.index)

router.get('/login', async (req, res) => {
    try {
        await res.render('admin/login', {
            layout: false
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/login', adminController.login)

module.exports = router
