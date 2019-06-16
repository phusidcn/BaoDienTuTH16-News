const moongoose = require('mongoose')
const Schema = moongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    views: Number,
    image: String,
    like: Number,
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
    premium: {
        type: Boolean,
        required: true
    },
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    usePushEach: true
})

module.exports = moongoose.model('Post', PostSchema)