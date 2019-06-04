const moongoose = require('mongoose')
const Category = require('../models/Category')
const Schema = moongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: String,
    linkYoutube: String,
    subContent: String,
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    premium: Boolean,
    status: {
        // 0: Chua Duyet , 1: Da duyet, 2: Bi tu choi, 3: Xuat ban
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    tag: String,
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'Writer'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports = moongoose.model('Post', PostSchema)