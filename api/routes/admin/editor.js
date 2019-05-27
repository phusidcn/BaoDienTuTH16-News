const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)
router.get('/', adminController.indexEditor)
router.post('/create', adminController.createEditor)
router.get('/edit/:id', adminController.editEditor)
router.put('/edit/:id', adminController.updateEditor)
router.delete('/:id', adminController.deleteEditor)

module.exports = router
