const express = require('express')
const Guest = require('../../models/Guest')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { userAuthenticated } = require('./../../helpers/authentication')
const LocalStrategy = require('passport-local').Strategy
const guestController = require('../../controllers/guestController')
const router = express.Router()

router.all('/*', guestController.all)
router.get('/', guestController.index)

router.get('/register', (req, res) => {
    res.render('guest/register', {
        layout: false
    })
})
router.get('/login', (req, res) => {
    res.render('guest/login', {
        layout: false
    })
})
router.post('/register', guestController.register)
router.post('/login', guestController.login)
router.get('/logout', guestController.logout)

module.exports = router