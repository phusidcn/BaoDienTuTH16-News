const moongoose = require('mongoose')
const Schema = moongoose.Schema

const TagSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = moongoose.model('Tag', TagSchema)