const Article = require('../models/article.models')

/**
 *  function list : List all tags
 * @param {*} req
 * @param {*} res
 * @returns {Array}
 */
exports.list = (req, res) => {
  // We get all articles and search for tags
  Article.find()
    .then(data => {
      let tags = []
      // we extract all tags from each articles and store them in tags Array
      data.forEach(item => {
        tags.push(...item.tag)
      })
      // Now we convert our Array into a Set to make sure we have unique tags
      let uniqueTags = Array.from(new Set(tags))
      res.send(uniqueTags)
    })
}
