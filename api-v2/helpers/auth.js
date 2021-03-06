module.exports = {
    editorEnsureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'EDITOR') {
            return next()
        }
        req.flash('error_msg', 'Please log in to view that resource')
        res.redirect('/employee/editors/login')
    },
    writerEnsureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'WRITER') {
            return next()
        }
        req.flash('error_msg', 'Please log in to view that resource')
        res.redirect('/employee/writers/login')
    },
    adminEnsureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'ADMIN') {
            return next()
        }
        req.flash('error_msg', 'Please log in to view that resource')
        res.redirect('/employee/admins/login')
    }, 
    subscriberEnsureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'SUBSCRIBER') {
            return next()
        }
        req.flash('error_msg', 'Please log in to view that resource')
        res.redirect('/subscribers/login')
    }, 
}