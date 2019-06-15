const moongoose = require('mongoose')
const Schema = moongoose.Schema

const CommentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = moongoose.model('Comment', CommentSchema)