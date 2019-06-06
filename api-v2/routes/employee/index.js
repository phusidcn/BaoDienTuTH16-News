const express = require('express')
const router = express.Router()
const { 
        writerEnsureAuthenticated,
        editorEnsureAuthenticated,
    } = require('../../helpers/auth');

// Main Page
router.get('/*', (req, res, next) => {
    req.app.locals.layout = 'employee'
    next()
})

router.get('/writers/dashboard', writerEnsureAuthenticated ,(req, res) => 
    res.render('employee/index')
);

router.get('/editors/dashboard', editorEnsureAuthenticated ,(req, res) => {
    res.render('employee/index')
})

module.exports = router;