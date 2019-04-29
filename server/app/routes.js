// app/routes.js

module.exports = (app, passport) => {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', (req, res) => {
        res.send('Helllo')
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/signin', (req, res) => {
        res.render('signin', {
            message: req.flash('loginMessage')
        })
    })

    // =====================================
    // SIGNUP===============================
    // =====================================
    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        })
    })


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

}