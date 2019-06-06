const express = require('express')
const router = express.Router()
const passport = require('passport')
const writerController = require('../../controllers/writerController')
const { forwardAuthenticated, ensureAuthenticated, writerIsLoggedIn } = require('../../helpers/writerAuth')

router.all('/*',writerController.all)
router.get('/', ensureAuthenticated, writerController.index)

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
// router.post('/login', writerController.login)
router.post('/login', forwardAuthenticated ,passport.authenticate('writerLocal'), (req, res) => {
    // console.log(req.user)
    res.redirect('/writer')
})

module.exports = router
