const express = require('express')
const Writer = require('../../models/Writer')
const writerController = require('../../controllers/writerController')
const router = express.Router()

router.get('/*', writerController.all)

router.get('/', writerController.index)

router.get('/login', (req, res) => {
    // res.render('home/register')
})

router.get('/register', (req, res) => {
    // res.render('home/register')
})

router.post('/register', (req, res) => {
    // const newWriter = new Writer({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // res.send('')
})

module.exports = router

