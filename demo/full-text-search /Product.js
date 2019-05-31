const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { ObjectedId } = mongoose.Schema.Types

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

productSchema.index({
    name: 'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1
    }
})

module.exports = mongoose.model('Product', productSchema)