const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const WriterSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

WriterSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

WriterSchema.methods.validPassword = async function (checkPassword) {
    const result = await bcrypt.compare(checkPassword, this.password)
    return result
}

module.exports = mongoose.model('Writer', WriterSchema)