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
    userType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)