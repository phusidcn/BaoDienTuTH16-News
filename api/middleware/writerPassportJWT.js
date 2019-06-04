const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Writer = require('../models/Writer');

module.exports = function (passport) {
    passport.use(
        'writerLocal',
        new LocalStrategy({ 
            usernameField: 'email',
        }, (email, password, done) => {
            // Match user
            Writer.findOne({
                email: email
            }).then(writer => {
                if (!writer) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                console.log(writer)
                // Match password
                bcrypt.compare(password, writer.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, writer);
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
        Writer.findById(id, function (err, user) {
            done(err, user);
        });
    });

};