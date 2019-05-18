const moongoose = require('mongoose')
const Schema = moongoose.Schema

const PostSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    linkYoutube: {
        type: String
    },
    subContent: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        required: true
    },
    premium: {
        type: Boolean,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },
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