const GoogleStrategy = require('passport-google-oauth20').Strategy
const configs = require('../config')

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: configs.googleClientID,
            clientSecret: configs.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, cb) => {
            console.log(accessToken)
            console.log(profile)
        })
    )
}


