const moongoose = require('mongoose')
const Schema = moongoose.Schema

const TagSchema = new Schema({
    name: String,
    category: { type: moongoose.Types.ObjectId, ref: 'Category' },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = moongoose.model('Tag', TagSchema)