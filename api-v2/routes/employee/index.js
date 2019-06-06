const express = require('express')
const router = express.Router()
const { 
        writerEnsureAuthenticated,
        writerForwardAuthenticated,
        editorEnsureAuthenticated,
    } = require('../../helpers/auth');

// Main Page
router.get('/*', (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()
})

router.get('/writers/dashboard' ,(req, res) => 
    res.render('employee/index')
);

router.get('/editors/dashboard', (req, res) => {
    res.render('employee/index')
})

module.exports = router;