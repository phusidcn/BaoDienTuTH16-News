const validationHandler = require('../validations/validationHandler')
const Post = require('../models/post')

exports.index = async (req, res, next) => {
    try {
        const post = await Post.find().sort({
            createdAt: -1
        })
        res.send(post)
    } catch (err) {
        next(err)
    }
}

exports.show = async (req, res, next) => {
    try {   
        const post = await Post.findOne({
            _id: req.params.id
        })
        res.send(post)
    } catch(err) {
        next(err)
    }
}

exports.store = async (req, res, next) => {
    try {
        validationHandler(req)
        const post = new Post()
        post.desc = req.body.desc
        post.image = req.body.image
        post = await post.save()

        res.send(post)
    } catch(err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        validationHandler(req)

        let post = await Post.findById(req.params.id)
        post.desc = req.body.desc
        post = await post.save()
        res.send(post)

    } catch(err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        await post.delete()
    
        res.send(post)
    } catch (err) {
        next(err)
    }
}