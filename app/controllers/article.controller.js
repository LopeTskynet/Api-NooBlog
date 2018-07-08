//models import
const Article = require('../models/article.models')
const Promise = require("bluebird")

//methods
/**
 * function create : Create a new article for save it in BDD
 *
 * @param {String} article
 * @param {String} title
 * @param {Array} tag
 * @return {void}
 */
exports.create = (req, res) => {
  if(!req.body.article){
    return res.status(400).send({
        message: "no article given"
    })
  }
  if(!req.body.title){
    return res.status(400).send({
      message: "no title given"
    })
  }
  if(!req.body.tag){
    return res.status(400).send({
      message: "no tag given"
    })
  }
  let date = new Date().toLocaleDateString()
  const article = new Article({
      article:  req.body.article,
      title: req.body.title,
      tag: req.body.tag,
      date: date
  })
  article.save()
  .then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
        message: err.message ||"an error occured."
    })
  })
}
