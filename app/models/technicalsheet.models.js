const mongoose = require('mongoose')

//Schema of the database
const TechnicalsheetSchema = mongoose.Schema({
    name: String,
    pharmacologie: String,
    chimie: String,
    toxicity: String,
    isFinish: Boolean,
    effects: {
      physic: {
        name: Array,
        describe: Array
      },
      cognitif: {
        name: Array,
        describe: Array
      },
      indesirable: {
        name: Array,
        describe: Array
      }
    },
    references: {
      urlTab: Array
    }
})

module.exports = mongoose.model('Technicalsheet', TechnicalsheetSchema)
