const moongoose = require('mongoose')
const Schema = moongoose.Schema

const SubscriberSchema = new Schema({
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
    membership: {
        type: String,
        required: true
    }
})

module.exports = moongoose.model('Subscriber', SubscriberSchema)