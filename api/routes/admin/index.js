const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)
router.get('/', adminController.index)
// router.get('/editor', adminController.editor)
// router.get('/premium-user', adminController.user)
// router.get('/profile', adminController.profile)
// router.get('/writer', adminController.writer)

module.exports = router
