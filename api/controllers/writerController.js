const Post = require('../models/Post')
const validationHandler = require('../validations/validationHandler')

exports.all = (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
}

// Writer create post
exports.index = async (req, res) => {
    try {
        await res.render('writer/index')
    } catch (err) {
        console.log(err)
    }
}

exports.store = async (req, res, next) => {
    try {
        // validationHandler(req)

        let post = new Post()
        // post.image = req.file.image
        post.title = req.body.title
        post.category = req.body.category
        post.tag = req.body.tag
        post.content = req.body.content
        post = await post.save().then(() => {
            res.redirect('/writer/post') 
        })
    } catch (error) {
        next(error)
    }
}

// ==========================================
exports.editDenied = async (req, res) => {
    try {
        await res.render('writer/writer_edit_denied_content')
    } catch (err) {
        console.log(err)
    }
}

exports.editWaiting = async (req, res) => {
    try {
        await res.render('writer/writer_edit_waiting_content')
    } catch (err) {
        console.log(err)
    }
}

exports.viewCensored = async (req, res) => {
    try {
        await res.render('writer/writer_view_censored')
    } catch (err) {
        console.log(err)
    }
}


exports.viewDenied = async (req, res) => {
    try {
        await res.render('writer/writer_view_denied')
    } catch (err) {
        console.log(err)
    }
}

exports.viewPublished = async (req, res) => {
    try {
        await res.render('writer/writer_view_published')
    } catch (err) {
        console.log(err)
    }
}

exports.viewWaiting = async (req, res) => {
    try {
        let posts = await Post.find({})
        res.render('writer/writer_view_waiting', {
            posts: posts
        })
    } catch (err) {
        console.log(err)
    }
}