'use strict'

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, dropDups: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)
