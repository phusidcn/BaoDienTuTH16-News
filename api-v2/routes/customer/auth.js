const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/guests/login'
}), (req, res) => {
    res.redirect('/home')
})

router.get('/facebook', passport.authenticate('facebook')    )
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/guests/login'
}), (req, res) => {
    res.redirect('/home')
})

module.exports = router