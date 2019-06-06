const express = require('express')
const guestController = require('../../controllers/guestController')
const router = express.Router()

router.all('/*', guestController.all)
router.get('/', guestController.index)
router.get('/about', guestController.about)
router.get('/contact', guestController.contact)
router.get('/post', guestController.singlePost)

router.get('/register', (req, res) => {
    res.render('guest/register')
})
router.get('/login', (req, res) => {
    res.render('guest/login')
})
router.post('/register', guestController.register)
router.post('/login', guestController.login)
router.get('/logout', guestController.logout)

const Post = require('../../models/Post')
router.post('/search', (req, res) => {
    // const term = 'check'
    // Post.find({
    //     $text: {
    //         $search: term,
    //         $caseSensitive: false,
    //         $diacriticSensitive: false
    //     }
    // })
    // .then(posts => res.send(posts))
    // .catch(error => console.log(error))
    var query = {
        '$text': {
            '$search': req.query.search,
            '$language': 'en'
        }
    }
    Post.find({
        "$text": {
            "$search": req.body.search
        }
    }).then((err, posts) => {
        console.log(req.body.search)
        if(err) res.status(500).json({error: 'Error Internal Server'})
        res.status(200).json(posts)
    })
})

// router.get('/auth/google', guestController.google)
// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/');
//     });

// router.get('/auth/facebook', guestController.facebook)
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     function(req, res) {
//         res.redirect('/')
//     }
// )

module.exports = router