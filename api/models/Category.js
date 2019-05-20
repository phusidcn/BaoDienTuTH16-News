const moongoose = require('mongoose')
const Schema = moongoose.Schema

const CategorySchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = moongoose.model('Category', CategorySchema)