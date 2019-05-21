const moongoose = require('mongoose')
const Schema = moongoose.Schema

const SubscriberSchema = new Schema({
    id: {
        type: String,
        required: true
    },
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