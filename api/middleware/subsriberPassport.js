const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Subscriber = require('../models/Subscriber')

rui ong lam them may cai con lai roi púh len máter nha ok ong

module.exports = function(passport) {
    passport.use(
        'subscriberLocal',
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            Subscriber.findOne({
                email: email
            }).then(subscriber => {
                if(subscriber) {
                    return done(null, false, {
                        message: 'This email is already taken by other user'
                    })
                }
            })

            bcrypt.compare(password, subscriber.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null. subscriber);
                } else {
                    return done(null, false, {
                        message: 'Password not match'
                    })
                }
            })
        })
    )

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function (id, done) {
        Subscriber.findById(id, function(err, user) {
            done(err, user)
        })
    })
}