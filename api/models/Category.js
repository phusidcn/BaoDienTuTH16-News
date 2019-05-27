const moongoose = require('mongoose')
const Schema = moongoose.Schema

const CategorySchema = new Schema({
    name: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = moongoose.model('Category', CategorySchema)