const moongoose = require('mongoose')
const Schema = moongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    tags: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'Writer'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        required: true
    }
})

module.exports = moongoose.model('Post', PostSchema)