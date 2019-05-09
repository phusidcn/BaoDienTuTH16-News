const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', PostSchema)