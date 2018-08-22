// models import
// const Article = require('../models/article.models')
const TechnicalMethod = require('./technicalsheet.method')
const Technicalsheet = require('../models/technicalsheet.models')
// methods
/**
 * function create : Create a new technicalsheet in bdd
 *
 * @param {Object} technicalsheet
 * @return {void}
 */
exports.create = (req, res) => {
  if (req.body.technicalsheet != null) {
    if (TechnicalMethod.checkTechnicalObject(req.body.technicalsheet)) {
      let isFinish = false
      if (req.body.technicalsheet.isFinish === 'true') {
        isFinish = true
      }
      const technicalSave = new Technicalsheet({
        name: req.body.technicalsheet.name,
        pharmacologie: req.body.technicalsheet.pharmacologie,
        chimie: req.body.technicalsheet.chimie,
        toxicity: req.body.technicalsheet.toxicity,
        isFinish: isFinish,
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
        .catch(err => {
          console.log(err)
          res.status(500).send({
            message: err.message || 'an error occured.'
          })
        })
    } else {
      console.log('ERROR, TECHNICALSHEET IS NOT GOOD')
      res.status(500).send({
        message: 'Technicalsheet is empty'
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
        message: err.message || 'an error has occured.'
      })
    })
}
