const express = require('express');
const router = express.Router();
// const { 
//         ensureAuthenticated, 
//         forwardAuthenticated 
//     } = require('../config/auth');

// Main Page
router.get('/', (req, res) => res.render('guest/guestHome'));

// Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//     res.render('dashboard', {
//         user: req.user
//     })
// );

module.exports = router;