const moongoose = require('mongoose')
const Schema = moongoose.Schema

const SubscriberSchema = new Schema({
    avatar: String,
    name: {
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
    membership: {
        type: String,
        required: true
    }
})

module.exports = moongoose.model('Subscriber', SubscriberSchema)