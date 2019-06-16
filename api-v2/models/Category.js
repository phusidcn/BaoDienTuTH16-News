const moongoose = require('mongoose')
const Schema = moongoose.Schema

const CategorySchema = new Schema({
    name: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
})

module.exports = moongoose.model('Category', CategorySchema)