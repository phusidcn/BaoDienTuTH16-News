const moongoose = require('mongoose')
const Schema = moongoose.Schema

const CommentSchema = new Schema({
    content: String,
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