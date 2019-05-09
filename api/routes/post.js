const express = require('express')
const router = express.Router()
const uploadImage = require('../middleware/multer')
const { hasDesc } = require('../validations/validators')
const postController = require('../controllers/postController')

router.get('/', postController.index)
router.get('/:id', postController.show)
router.post('/'
        , uploadImage('posts').single('image') 
        , hasDesc
        , postController.store
    )

router.patch(':/id', hasDesc, postController.update)
router.delete('/:id', postController.delete)

module.exports = router