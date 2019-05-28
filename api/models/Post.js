const moongoose = require('mongoose')
const Category = require('../models/Category')
const Schema = moongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: [100, 'Too long, max is 100 characters']
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
        // 0: Chua Duyet , 1: Da duyet, 2: Bi tu choi
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    // tags: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Tag'
    //     }
    // ],
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