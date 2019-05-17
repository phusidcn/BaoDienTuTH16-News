const moongoose = require('mongoose')
const Schema = moongoose.Schema

const CommentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'Guest'
    },
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'Subscriber'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

module.exports = moongoose.model('Comment', CommentSchema)