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
    shortContent: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
    // tag: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Tag'
    // },
    // writer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Writer'
    // },
    // comment: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Comment'
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    premium: {
        type: Boolean,
        // required: true
    },
    status: {
        // 0: Chua Duyet , 1: Da duyet, 2: Bi tu choi
        type: Number,
        default: 0
    }
})

module.exports = moongoose.model('Post', PostSchema)