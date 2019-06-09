const mongoose = require('mongoose')
const Schema = mongoose.Schema

const crypto = require('crypto')

let UserToken

const UserTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    token: String
})

UserTokenSchema.statics.new = function (userId, fn) {
    let user = new UserToken()
   // create a random string
   crypto.randomBytes(48, function (ex, buf) {
     let token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-')
     user.token = userId + '|' + token.toString().slice(1, 24)
     user.userId = userId
     user.save(fn)
   });
}

// Export the UserToken model
exports.UserToken = UserToken = mongoose.model('UserToken', UserTokenSchema)