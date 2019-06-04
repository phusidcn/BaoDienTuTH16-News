const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
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
    writers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Writer'
        }
    ],
    editors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Editor'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

module.exports = mongoose.model('Admin', AdminSchema)