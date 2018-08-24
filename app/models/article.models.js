const mongoose = require('mongoose')

// Schema of the database
const ArticleSchema = mongoose.Schema({
  article: String,
  title: String,
  tag: Array,
  date: Date,
  isFinish: Boolean
})

module.exports = mongoose.model('Article', ArticleSchema)
