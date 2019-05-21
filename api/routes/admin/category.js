const express = require('express')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)
router.get('/', adminController.indexCategory)
router.post('/create', adminController.createCategory)
router.get('/edit/:id', adminController.editCategory)
router.put('/edit/:id', adminController.updateCategory)
router.delete('/:id', adminController.deleteCategory)

module.exports = router
