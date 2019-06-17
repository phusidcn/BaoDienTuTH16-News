const Category = require('../models/Category')
const Tag = require('../models/Tag')
const Post = require('../models/Post')
const User = require('../models/User')


const bcrypt = require('bcryptjs')
const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')

exports.updateProfile = (req, res) => {
    const {
        email,
        name,
    } = req.body

    let filename = ''
    if (!isEmpty(req.files)) {
        let file = req.files.avatar
        filename = file.name + '-' + Date.now()

        file.mv('./public/uploads/' + filename, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    User
        .findOne({
            _id: req.params.id
        })
        .then(admin => {
            admin.email = email
            admin.name = name
            admin.avatar = filename

            admin
                .save()
                .then(updatedAdmin => {
                    req.flash('success_msg', `Account ${updatedAdmin.name} was successfully updated`);
                    res.redirect('/employee/admins/dashboard/')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.changePass = (req, res) => {
    User
    .findOne({
        _id: req.params.id
    })
    .then(admin => {
        res.render('admin/changePassword',{
            admin : admin,
            layout: false
        })
    })
}


exports.changePassApply = (req, res) => {
    let errors = []
    if (req.body.newpass !== req.body.confirmpass) {
        errors.push({
            msg: "Please re-confirm your password"
        })
    }
    let pass = req.body.newpass
    if(pass.length < 6) {
        errors.push({
            msg: "Your new pass is too short"
        })
    }
    User
    .findOne({
        _id: req.params.id
    })
    .then(admin => {
        console.log(admin)
        bcrypt.compare(req.body.oldpass, admin.password, (err, isMatch) => {
            if (!isMatch) {
                console.log(err)
                errors.push({
                    msg: "please check your old password"
                })
            }
            if (errors.length > 0) {
                res.render('admin/changePassword', {
                    errors,
                    admin,
                    layout : false
                })
            } else {
                if (isMatch) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.newpass, salt, (err, hash) => {
                            if (err){
                                errors.push({
                                    msg: "Error"
                                })
                                throw err
                            } else {
                                admin.password = hash
                                admin.save()
                                res.redirect('/employee/admins/dashboard')
                            }
                        })
                    })
                }
            }
        })
    })
}

/**
 * CATEGORY
 */
exports.indexCategory = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.render('admin/category/index', {
            categories
        })
    } catch (error) {
        console.log(error)
    }
}

exports.indexCreateCategory = (req, res) => {
    res.render('admin/category/create')
}

exports.createCategory = async (req, res) => {
    try {
        let newCategory = new Category({
            name: req.body.name,
            subCategory: req.body.subCate
        })
        newCategory = await newCategory.save()
        res.redirect('/employee/admins/dashboard/category')
    } catch (error) {
        console.log(error)
    }
}

exports.indexUpdateCategory = async (req, res) => {
    try {
        let foundCate = await Category.findOne({ _id: req.params.id })
        res.render('admin/category/edit', {
            category: foundCate
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let { name } = req.body
        let foundCate = await Category.findOne({ _id: req.params.id })
        foundCate.name = name
        await foundCate.save().then(updatedCate => {
            res.redirect('/employee/admins/dashboard/category')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.indexAddSubCate = async (req, res) => {
    try {
        let foundCate = await Category.findOne({ _id: req.params.id })
        res.render('admin/category/add', {
            category: foundCate
        })
    } catch (error) {
        console.log(error)
    }
}

exports.addSubcategory = async (req, res) => {
    try {
        let foundCate = await Category.findOne({ _id: req.params.id })
        foundCate.subCategory.push({
            content: req.body.subcate
        })
        await foundCate.save().then(() => {
            res.redirect('/employee/admins/dashboard/category')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.remove({ _id: req.params.id })
        res.redirect('/employee/admins/dashboard/category')
    } catch (error) {
        console.log(error)
    }
}


/**
 * TAG
 */
exports.indexTag = async (req, res) => {
    try {
        const tags = await Tag.find({}).populate('category')
        res.render('admin/tag/index', {
            tags
        })
    } catch (error) {
        console.log(error)
    }
}

exports.indexCreateTag = async (req, res) => {
    try {
        let categories = await Category.find({})
        res.render('admin/tag/create', {
            categories
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createTag = async (req, res) => {
    try {
        let newTag = new Tag({
            name: req.body.name,
            category: req.body.category
        })
        newTag = await newTag.save()
        res.redirect('/employee/admins/dashboard/tag')
    } catch (error) {
        console.log(error)
    }
}

exports.indexUpdateTag = async (req, res) => {
    try {
        let foundTag = await Tag.findOne({ _id: req.params.id }).populate('category')
        let categories = await Category.find({})
        res.render('admin/tag/edit', {
            tag: foundTag,
            categories: categories
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateTag = async (req, res) => {
    try {
        let { name, category } = req.body
        let foundTag = await Tag.findOne({ _id: req.params.id })
        foundTag.name = name
        foundTag.category = category
        await foundTag.save().then(updatedTag => {
            res.redirect('/employee/admins/dashboard/tag')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const deletedTag = await Tag.remove({ _id: req.params.id })
        res.redirect('/employee/admins/dashboard/tag')
    } catch (error) {
        console.log(error)
    }
}

/**
 * POST
 */
exports.indexPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('writer')
        res.render('admin/post/index', {
            posts
        })
    } catch (error) {
        console.log(error)
    }
}

exports.indexUpdatePost = async (req, res) => {
    try {
        let foundPost = await Post.findOne({ _id: req.params.id })
        res.render('admin/post/edit', {
            post: foundPost,
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updatePost = async (req, res) => {
    try {
        let { title, status } = req.body
        let foundPost = await Post.findOne({ _id: req.params.id })
        foundPost.title = title
        foundPost.status = status
        console.log(foundPost)
        await foundPost.save().then(updatedPost => {
            res.redirect('/employee/admins/dashboard/post')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.remove({ _id: req.params.id })
        res.redirect('/employee/admins/dashboard/post')
    } catch (error) {
        console.log(error)
    }
}

/**
 * WRITER
 */
exports.indexWriter = async (req, res) => {
    try {
        const writers = await User.find({
            role: 'WRITER'
        })
        res.render('admin/writer/index', {
            writers
        })
    } catch (error) {
        console.log(error)
    }
}

exports.indexCreateWriter = async (req, res) => {
    res.render('admin/writer/create')
}

exports.createWriter = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    let errors = []

    if (!name || !email || !password) {
        errors.push({
            msg: 'Please add all fields'
        })
    }

    if (errors.length > 0) {
        res.render('admin/writer/create', {
            name,
            email,
            password,
            errors: errors
        })
    } else {
        let filename = ''
        if (!isEmpty(req.files)) {
            let file = req.files.image
            filename = file.name + '-' + Date.now()

            file.mv('./public/uploads/' + filename, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        const newWriter = new User({
            name: req.body.name,
            avatar: filename,
            role: 'WRITER',
            email: req.body.email,
            password: password
        })

        bcrypt
            .genSalt(10, (err, salt) => {
                bcrypt.hash(newWriter.password, salt, (err, hash) => {
                    if (err) throw err
                    newWriter.password = hash
                    newWriter
                        .save()
                        .then(savedWriter => {
                            req.flash(
                                'success_msg',
                                'You created writer successully'
                            );
                            res.redirect('/employee/admins/dashboard/writer')
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
            })


    }
}

exports.indexUpdateWriter = async (req, res) => {
    try {
        let foundWriter = await User.findOne({ _id: req.params.id })
        res.render('admin/writer/edit', {
            writer: foundWriter
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateWriter = async (req, res) => {
    try {
        let { name, email } = req.body
        let foundWriter = await User.findOne({ _id: req.params.id })
        foundWriter.name = name
        foundWriter.email = email
        await foundWriter
            .save()
            .then(updatedWriter => {
                res.redirect('/employee/admins/dashboard/writer')
            })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteWriter = async (req, res) => {
    try {
        const deletedWriter = await User.remove({ _id: req.params.id })
        res.redirect('/employee/admins/dashboard/writer')
    } catch (error) {
        console.log(error)
    }
}


/**
 * EDITOR
 */
exports.indexEditor = async (req, res) => {
    try {
        const editors = await User.find({
            role: 'EDITOR'
        })
        res.render('admin/editor/index', {
            editors
        })
    } catch (error) {
        console.log(error)
    }
}

exports.indexCreateEditor = async (req, res) => {
    Category
        .find({})
        .then(categories => {
            res.render('admin/editor/create', {
                categories
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createEditor = async (req, res) => {
    const {
        name,
        email,
        password,
        category
    } = req.body

    let errors = []

    if (!name || !email || !password || !category) {
        errors.push({
            msg: 'Please add all fields'
        })
    }

    if (errors.length > 0) {
        res.render('admin/editor/create', {
            name,
            email,
            password,
            category,
            errors: errors
        })
    } else {
        let filename = ''
        if (!isEmpty(req.files)) {
            let file = req.files.image
            filename = file.name + '-' + Date.now()

            file.mv('./public/uploads/' + filename, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        const newEdtior = new User({
            name: req.body.name,
            avatar: filename,
            role: 'EDITOR',
            category: req.body.category,
            email: req.body.email,
            password: password
        })

        bcrypt
            .genSalt(10, (err, salt) => {
                bcrypt.hash(newEdtior.password, salt, (err, hash) => {
                    if (err) throw err
                    newEdtior.password = hash
                    newEdtior
                        .save()
                        .then(savedEditor => {
                            req.flash(
                                'success_msg',
                                'You created writer successully'
                            );
                            res.redirect('/employee/admins/dashboard/editor')
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
            })


    }
}

exports.indexUpdateEditor = async (req, res) => {
    try {
        let foundEditor = await User.findOne({ _id: req.params.id })
        res.render('admin/editor/edit', {
            editor: foundEditor
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateEditor = async (req, res) => {
    try {
        let { name, email } = req.body
        let foundEditor = await User.findOne({ _id: req.params.id })
        foundEditor.name = name
        foundEditor.email = email
        await foundEditor
            .save()
            .then(updatedEditor => {
                res.redirect('/employee/admins/dashboard/editor')
            })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteEditor = async (req, res) => {
    try {
        const deletedEditor = await User.remove({ _id: req.params.id })
        res.redirect('/employee/admins/dashboard/editor')
    } catch (error) {
        console.log(error)
    }
}

/**
 * SUBSCRIBER
 */

exports.indexSubscriber = async (req, res) => {
    try {
        const subscribers = await User.find({
            role: 'SUBSCRIBER'
        })
        res.render('admin/subscriber/index', {
            subscribers
        })
    } catch (error) {
        console.log(error)
    }
}

exports.banSubscriber = async (req, res) => {
    User
        .findOne({
            _id: req.params.id
        })
        .then(user => {
            user.role = "GUEST"
            user.save()
            res.redirect('/employee/admins/dashboard/subscriber/')
        })
        .catch(err => {
            console.log(err)
        })
}