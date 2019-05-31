const express = require('express')
const editorController = require('../../controllers/editorController')
const router = express.Router()

router.all('/*', editorController.all)
router.get('/', editorController.index)

router.get('/register', (req, res) => {
    res.render('editor/register', {
        layout: false
    })
})
router.get('/login', (req, res) => {
    res.render('editor/login', {
        layout: false
    })
})

router.post('/register',editorController.register)
router.post('/login',editorController.login)


module.exports = router