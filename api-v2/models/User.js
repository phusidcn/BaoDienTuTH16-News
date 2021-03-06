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
        // required: true
    },
    role: String,
    membership: String,
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
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    googleID: {
        type: String
    },
    facebookID:{
        type: String
    },
    startDay: {
        type: Date,
        default: Date.now
    },
    endDay: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000)
    }
})


module.exports = mongoose.model('User', UserSchema)