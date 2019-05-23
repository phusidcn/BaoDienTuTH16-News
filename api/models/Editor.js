const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const EditorSchema = new Schema({
    avatar: String,
    name: {
        type: String,
        required: true,
        min: [6, 'Too short, min is 6 characters']
    },
    email: { type: String,
        required: 'Email is Required',
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Password is required'
    },
    info: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
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