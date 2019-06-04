const express = require('express')
const router = express.Router()
const writerController = require('../../controllers/writerController')

router.all('/*',writerController.all)
router.get('/',writerController.index)

router.get('/register', (req, res) => {
    res.render('writer/register',{
        layout: false
    })
})

router.get('/login', (req, res) => {
    res.render('writer/login',{
        layout: false
    })
})

router.post('/register', writerController.register)
router.post('/login', writerController.login)


module.exports = router

module.exports = router