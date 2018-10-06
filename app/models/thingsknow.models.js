const mongoose = require('mongoose')

// Schema of the database
const ThingsKnow = mongoose.Schema({
  question: String,
  answer: String
})

module.exports = mongoose.model('ThingsToKnow', ThingsKnow)
