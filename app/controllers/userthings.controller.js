//models import
// const Users = require('../models/users.models')
// const crypto = require('./crypto')
// const Promise = require("bluebird")
// const token = require('./connection.token')
// const tokenMethod = require('./token.method')
const ThingsKnow = require('../models/thingsknow.models')
const Promise = require("bluebird")
const Token = require('./token.method')
const Users = require('../models/users.models')
//Methods
/**
  * @param {String} pseudo
  * @param {String} token
  * @param {String} question
  * @param {String} answer
  * @return {String} the status of action
*/
exports.create = (req, res) => {
  if (!req.body.pseudo) throw new Error('pseudo is empty')
  if (!req.body.token) throw new Error('token is empty')
  if (!req.body.question) throw new Error('question is empty')
  if (!req.body.answer) throw new Error('answer is empty')
  Token.tokenIsGood(req.body.pseudo, req.body.token)
  .then(response => {
    if (!response) throw new Error('token is not good')
    return Users.find({
      pseudo: req.body.pseudo,
      token: req.body.token
    })
  })
  .then(response => {
    if (!response) throw new Error('user is not found')
    const userThings = new ThingsKnow({
      question : req.body.question,
      answer: req.body.answer
    })
    return userThings.save()
  })
  .then(response => {
    if (!response) throw new Error ('an error as occured')
    res.send(response)
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: 'an error occured :' + err
    })
  })
}

exports.getAllUserThings = (req, res) => {
  ThingsKnow.find()
  .then(response => {
    if (!response) throw new Error('No Things to Know found')
    res.send(response)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message ||"an error has occured."
    })
  })
}

exports.updateThingById = (req, res) => {
  if (!req.body.pseudo) throw new Error('pseudo is empty')
  if (!req.body.token) throw new Error('token is empty')
  if (!req.body.thing) throw new Error('Thing is empty')
  Token.tokenIsGood(req.body.pseudo, req.body.token)
  .then(response => {
    if (!response) throw new Error('the token is bad')
    return Users.find({
      pseudo: req.body.pseudo,
      token: req.body.token
    })
  })
  .then(response => {
    if (!response) throw new Error('the user is not found')
    return ThingsKnow.findById(req.body.thing._id)
  })
  .then(response => {
    if(!response) throw new Error('the thing is not found')
    console.log(req.body.thing.answer)
    console.log(req.body.thing.question)
    console.log(req.body.thing._id)
    return ThingsKnow.findByIdAndUpdate(req.body.thing._id, {
      question: req.body.thing.question,
      answer: req.body.thing.answer
    })
  })
  .then(response => {
    if(!response) throw new Error('an error as occured during updating')
    res.send('the thing is updated')
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: 'an error occured :' + err
    })
  })
}
