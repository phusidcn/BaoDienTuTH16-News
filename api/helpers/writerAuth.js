module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        console.log(req.isAuthenticated())
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/writer/login');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/writer');
    },
    writerIsLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        res.redirect('/writer/login')
    }
}