//models import
//const Article = require('../models/article.models')
const User = require('./users.controller')
const Users = require('../models/users.models')
const Promise = require("bluebird")
const Token = require('./token.method')
const TechnicalMethod = require('./technicalsheet.method')
const Technicalsheet = require('../models/technicalsheet.models')
//methods
/**
 * function create : Create a new technicalsheet in bdd
 *
 * @param {Object} technicalsheet
 * @return {void}
 */
exports.create = (req, res) => {
  if(req.body.technicalsheet != null){
    if(TechnicalMethod.checkTechnicalObject(req.body.technicalsheet)){
      isFinish = false
      if(req.body.technicalsheet.isFinish == 'true'){
        isFinish = true
      }
      const technicalSave = new Technicalsheet({
        name: req.body.technicalsheet.name,
        pharmacologie: req.body.technicalsheet.pharmacologie,
        chimie: req.body.technicalsheet.chimie,
        toxicity: req.body.technicalsheet.toxicity,
        isFinish : isFinish,
        effects: {
          physic: {
            name: req.body.technicalsheet.effects.physic.name,
            describe: req.body.technicalsheet.effects.physic.describe,
            counter: req.body.technicalsheet.effects.physic.counter
          },
          cognitif: {
            name: req.body.technicalsheet.effects.cognitif.name,
            describe: req.body.technicalsheet.effects.cognitif.describe,
            counter: req.body.technicalsheet.effects.cognitif.counter
          },
          indesirable: {
            name: req.body.technicalsheet.effects.indesirable.name,
            describe: req.body.technicalsheet.effects.indesirable.describe,
            counter: req.body.technicalsheet.effects.indesirable.counter
          }
        },
        references: {
          urlTab: req.body.technicalsheet.references.urlTab,
          counter: req.body.technicalsheet.references.counter
        }
      })
      technicalSave.save()
      .then(response => {
        res.send(response)
      })
      .catch( err => {
        console.log(err)
        res.status(500).send({
            message: err.message ||"an error occured."
        })
      })
    } else {
      console.log('ERROR, TECHNICALSHEET IS NOT GOOD')
      res.status(500).send({
        message: "Technicalsheet is empty"
      })
    }
  }
}
/**
 * Find all technical sheet and return it
 */
exports.findAll = (req, res) => {
  Technicalsheet.find()
  .then(response => {
    res.send(response)
  }).catch(err => {
    res.status(500).send({
      message: err.message ||"an error has occured."
    })
  })
}

exports.findInProgress = (req, res) => {
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
  Token.tokenIsGood(req.body.pseudo, req.body.token)
  .then(response => {
    if (!response) {
      throw new Error('token is not good')
    }
    return Technicalsheet.find()
  })
  .then(response => {
    if(!response){
      throw new Error('no technicalsheet found')
    }
    let tabInProgress = []
    response.forEach(item => {
      if(item.isFinish === false) {
        tabInProgress.push(item)
      }
    })
    res.send(tabInProgress)
  }).catch(err => {
    res.status(500).send({
      message: err.message ||"an error has occured."
    })
  })
}

/**
 * function create : Create a new technicalsheet in bdd
 *
 * @param {Object} technicalsheet
 * @param {String} id
 * @param {String} token
 * @param {String} pseudo
 * @return {void}
 */
exports.updateById = (req ,res) => {
  if (!req.body.pseudo) throw new Error('pseudo is empty')
  if (!req.body.token) throw new Error('token is empty')
  if (!req.body.id) throw new Error('id is empty')
  if (!req.body.technicalsheet) throw new Error('technicalsheet is empty')
  Token.tokenIsGood(req.body.pseudo, req.body.token)
  .then(response => {
    if (!response) {
      throw new Error('token is not good')
    }
    return Users.find({
      pseudo: req.body.pseudo,
      token: req.body.token
    })
  })
  .then(response => {
    if (!response) throw new Error ('the user is not found')
    return Technicalsheet.findById(req.body.id)
  })
  .then(response => {
    if (!response) throw new Error('the technicalsheet is not found')
    if(TechnicalMethod.checkTechnicalObject(req.body.technicalsheet)){
      isFinish = false
      if(req.body.technicalsheet.isFinish == 'true'){
        isFinish = true
      }
      Technicalsheet.findByIdAndUpdate(req.body.id, {
        name: req.body.technicalsheet.name,
        pharmacologie: req.body.technicalsheet.pharmacologie,
        chimie: req.body.technicalsheet.chimie,
        toxicity: req.body.technicalsheet.toxicity,
        isFinish : isFinish,
        effects: {
          physic: {
            name: req.body.technicalsheet.effects.physic.name,
            describe: req.body.technicalsheet.effects.physic.describe,
            counter: req.body.technicalsheet.effects.physic.counter
          },
          cognitif: {
            name: req.body.technicalsheet.effects.cognitif.name,
            describe: req.body.technicalsheet.effects.cognitif.describe,
            counter: req.body.technicalsheet.effects.cognitif.counter
          },
          indesirable: {
            name: req.body.technicalsheet.effects.indesirable.name,
            describe: req.body.technicalsheet.effects.indesirable.describe,
            counter: req.body.technicalsheet.effects.indesirable.counter
          }
        },
        references: {
          urlTab: req.body.technicalsheet.references.urlTab,
          counter: req.body.technicalsheet.references.counter
        }
      })
      .then(response => {
        if (!response) throw new Error('an error as occured')
        res.send('the article is update')
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'an error occured :' + err
        })
      })
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: 'an error occured :' + err
    })
  })
}
