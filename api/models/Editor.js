const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const EditorSchema = new Schema({
    avatar: String,
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Editor', EditorSchema)