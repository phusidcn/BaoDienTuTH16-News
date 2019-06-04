const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Guest = require('../models/Guest');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ 
            usernameField: 'email',
        }, (email, password, done) => {
            // Match user
            Guest.findOne({
                email: email
            }).then(guest => {
                if (!guest) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                console.log(guest)
                // Match password
                bcrypt.compare(password, guest.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, guest);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Guest.findById(id, function (err, user) {
            done(err, user);
        });
    });

};