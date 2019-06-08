const Category = require('../models/Category')
const Tag = require('../models/Tag')

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
            name: req.body.name
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

 