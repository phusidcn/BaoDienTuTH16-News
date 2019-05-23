const moongoose = require('mongoose')
const Schema = moongoose.Schema

const TagSchema = new Schema({
    name: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = moongoose.model('Tag', TagSchema)