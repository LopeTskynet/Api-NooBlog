const Promise = require("bluebird")
const Users = require('../models/users.models')
const token = require('./connection.token')

exports.tokenIsGood = (pseudoParam, tokenParam) => {
  return new Promise((resolve,reject) => {
    Users.find({
      pseudo: pseudoParam,
      token: tokenParam
    }) // le find verifie pas si le token est bon ou pas
    .then(response => {
      if(typeof(response[0]) !== 'undefined'){
          if(tokenParam == response[0].token){
            token.verifyToken(response[0].token)
            .then(response => {
              resolve(true)
            })
            .catch( err => {
              console.error(err)
              reject(err)
            })
          } else{
            reject('token not match')
          }

      } else {
        reject('token not found')
      }
    })
    .catch( err => {
      console.error(err)
    })
  })
}
