const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const AdminSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    writers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Writer'
        }
    ],
    editors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Editor'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

AdminSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

AdminSchema.methods.validPassword = async function (checkPassword) {
    const result = await bcrypt.compare(checkPassword, this.password)
    return result
}

module.exports = mongoose.model('Admin', AdminSchema)