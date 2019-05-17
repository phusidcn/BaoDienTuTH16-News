const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const EditorSchema = new Schema({
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
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

EditorSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

EditorSchema.methods.validPassword = async function (checkPassword) {
    const result = await bcrypt.compare(checkPassword, this.password)
    return result
}

module.exports = mongoose.model('Editor', EditorSchema)