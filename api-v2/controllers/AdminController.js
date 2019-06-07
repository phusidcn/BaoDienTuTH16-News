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