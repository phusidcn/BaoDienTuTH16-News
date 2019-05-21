const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)
router.get('/', adminController.indexTag)
router.post('/create', adminController.createTag)
router.get('/edit/:id', adminController.editTag)
router.put('/edit/:id', adminController.updateTag)
router.delete('/:id', adminController.deleteTag)

module.exports = router
