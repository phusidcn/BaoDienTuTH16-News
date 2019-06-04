const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController')

router.all('/*', adminController.all)
router.get('/', adminController.indexPost)
router.get('/edit/:_id', adminController.editPost)
router.put('/edit/:_id', adminController.updatePost)
router.delete('/:_id', adminController.deletePost)



module.exports = router;