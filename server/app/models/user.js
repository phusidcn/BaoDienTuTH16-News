// app/models/
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = mongoose.Schema({
    
})

module.exports = mongoose.model('User', UserSchema)