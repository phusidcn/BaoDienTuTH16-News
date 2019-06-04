const express = require('express')
const router = express.Router()
const writerController = require('../../controllers/writerController')
const { forwardAuthenticated, ensureAuthenticated } = require('../../helpers/writerAuth')

router.all('/*',writerController.all)
router.get('/', forwardAuthenticated, writerController.index)

router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('writer/register',{
        layout: false
    })
})

router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('writer/login',{
        layout: false
    })
})

router.post('/register', writerController.register)
router.post('/login', writerController.login)


module.exports = router

module.exports = router