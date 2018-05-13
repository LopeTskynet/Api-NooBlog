const nodeJWK = require('node-jwk')
const njwt = require('njwt')
const secureRandom = require('secure-random')
const userModele = require('../models/users.models')
const users = require('../controllers/users.controller.js')
const signingKey = secureRandom(256, {type: 'Buffer'})

const claims = {
    iss: 'nooblog',
    sub: 'test',
    scope: 'self'
}


/**
 * function genToken : made for generate token for user connection
 *
 * @param {String} id id of user in DataBase
 */
exports.genToken = ( ( id ) => {

  let jwt = njwt.create(claims,signingKey)
  jwt.setExpiration(new Date().getTime() + (60 * 60 * 1000)) //Expiration token set at one hour from now
  userModele.findByIdAndUpdate( id , {
    token: jwt.compact()
  }, {new: true})
  .then(users => {
    if(!users)  {
      return res.status(404).send({
          message: "users with id " + req.params.usersId + " not found"
      })
    }
  })
  .catch(err => {
    return res.status(500).send({
        message: "an error occured"
    })
  })

})

/**
 * function verifyToken
 *
 * @param {object} token value of token to verify
 */
exports.verifyToken  = ( token => {
  njwt.verify(token, signingKey, (err, verifiedJwt) => {
    if(err){
      console.log(err) //Token expired
    } else {
      console.log('this token is verified :' +verifiedJwt) // show the token
    }
  })
})
