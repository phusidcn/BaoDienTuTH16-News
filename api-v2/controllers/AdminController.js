const Category = require('../models/Category')

/* ================== CATEGORY ========================= */
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
        res.redirect('/employee/admins/category')
    } catch (error) {
        console.log(error)
    }
}

exports.indexUpdateCategory = async (req, res) => {
    try {
        let foundCate = await Category.findOne({_id: req.params.id})
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
        let foundCate = await Category.findOne({_id: req.params.id})
        foundCate.name = name
        await foundCate.save().then(updatedCate => {
            res.redirect('/employee/admins/category')
        })        
    } catch (error) {
        console.log(error)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.remove({_id: req.params.id})
        res.redirect('/employee/admins/category')
    } catch (error) {
        console.log(error)
    }
}