const User = require('../models/User')
const Category = require('../models/Category')
const Post = require('../models/Post')

exports.index = async (req, res) => {
    const posts = await Post.find({}).populate('category')
    const categories = await Category.find({})
    res.render('guest/guestHome', {
        posts,
        categories
    })
}