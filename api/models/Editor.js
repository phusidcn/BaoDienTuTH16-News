const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const EditorSchema = new Schema({
    avatar: String,
    name: {
        type: String,
        required: true,
        min: [6, 'Too short, min is 6 characters']
    },
    email: { type: String,
        required: 'Email is Required',
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: true,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Password is required'
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