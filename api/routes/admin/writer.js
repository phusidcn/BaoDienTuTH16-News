const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)
router.get('/', adminController.indexWriter)
router.post('/create', adminController.createWriter)
router.get('/edit/:id', adminController.editWriter)
router.put('/edit/:id', adminController.updateWriter)
router.delete('/:id', adminController.deleteWriter)

module.exports = router
