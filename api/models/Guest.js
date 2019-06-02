const moongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = moongoose.Schema

const GuestSchema = new Schema({
    avatar: String,
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = moongoose.model('Guest', GuestSchema)