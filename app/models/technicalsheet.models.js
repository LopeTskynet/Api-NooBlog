const mongoose = require('mongoose')

// Schema of the database
const TechnicalsheetSchema = mongoose.Schema({
  name: String,
  pharmacologie: String,
  chimie: String,
  toxicity: String,
  isFinish: Boolean,
  effects: {
    physic: {
      name: Array,
      describe: Array,
      counter: Number
    },
    cognitif: {
      name: Array,
      describe: Array,
      counter: Number
    },
    indesirable: {
      name: Array,
      describe: Array,
      counter: Number
    }
  },
  references: {
    urlTab: Array,
    counter: Number
  },
  date: Date
})

module.exports = mongoose.model('Technicalsheet', TechnicalsheetSchema)
