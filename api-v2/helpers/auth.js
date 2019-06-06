module.exports = {
    writerEnsureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Please log in to view that resource')
        res.redirect('/employee/writers/login')
    },
    writerForwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect('/employee/writers')
    },
    editorEnsureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Please log in to view that resource')
        res.redirect('/employee/editors/login')
    },
    editorForwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect('/employee/editors')
    },

}