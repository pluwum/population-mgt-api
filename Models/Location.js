'use strict'

const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
  name: { type: String, required: true },
  female: { type: String, required: true, dropDups: true },
  male: { type: String, required: true },
  parent_id: { type: String },
  created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Location', LocationSchema)
