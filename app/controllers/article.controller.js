//models import
const Article = require('../models/article.models')
const User = require('./users.controller')
const Promise = require("bluebird")
const Token = require('./token.method')

//methods
/**
 * function create : Create a new article for save it in BDD
 *
 * @param {String} article
 * @param {String} title
 * @param {Array} tag
 * @param {Boolean} isFinish
 * @return {void}
 */
exports.create = (req, res) => {
  isFinish = null
  if(!req.body.pseudo){
    return res.status(400).send({
        message: "no pseudo given"
    })
  }
  if(!req.body.token){
    return res.status(400).send({
        message: "no token given"
    })
  }
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
  if(!req.body.isFinish){
    return res.status(400).send({
      message: "no state given"
    })
  }
  if(req.body.isFinish && (req.body.isFinish == 'true'  || req.body.isFinish == 'false')){
    console.log('test')
    if(req.body.isFinish == 'true'){
      isFinish = true
    }else {
      isFinish = false
    }
  }else {
    return res.status(400).send({
      message: "bad state given"
    })
  }
  Token.tokenIsGood(req.body.pseudo, req.body.token)
  .then(testing => {
    let date = new Date().toLocaleDateString()
    const article = new Article({
        article:  req.body.article,
        title: req.body.title,
        tag: req.body.tag,
        date: date,
        isFinish: isFinish
    })
    article.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
          message: err.message ||"an error occured."
      })
    })
  }).catch(error => {
    console.error(error)
  })

}

exports.findAll = (req, res) => {
  Article.find()
  .then(response => {
    res.send(response)
  }).catch(err => {
    res.status(500).send({
        message: err.message || "an error occured."
    })
  })
}
