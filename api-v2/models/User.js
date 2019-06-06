const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    avatar: String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String,
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    editor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('User', UserSchema)