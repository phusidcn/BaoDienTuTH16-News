const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Editor = require('../models/Editor');

module.exports = function (passport) {
    passport.use(
        'editorLocal',
        new LocalStrategy({ 
            usernameField: 'email',
        }, (email, password, done) => {
            // Match user
            Editor.findOne({
                email: email
            }).then(editor => {
                if (!editor) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                console.log(editor)
                // Match password
                bcrypt.compare(password, editor.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, editor);
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
        Editor.findById(id, function (err, user) {
            done(err, user);
        });
    });

};