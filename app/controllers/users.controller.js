// models import
const Users = require('../models/users.models')
const crypto = require('./crypto')
const token = require('./connection.token')
const tokenMethod = require('./token.method')
// Methods
// Create a new user
exports.create = (req, res) => {
  // check if everything is here
  if (!req.body.pseudo) {
    return res.status(400).send({
      message: 'no pseudo given'
    })
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: 'no password given'
    })
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: 'no email given'
    })
  }
  crypto.genHash(req.body.password)
    .then(result => {
      var hash = result.hash
      // preparing change for the database using the models we import
      const users = new Users({
        pseudo: req.body.pseudo,
        password: hash,
        role: 'guest',
        first_name: req.body.first_name || null,
        last_name: req.body.last_name || null,
        email: req.body.email,
        token: null
      })
      // doing the modif on the database
      users.save()
        .then(data => {
          // returning the data we just create
          res.send(data)
        }).catch(err => {
          // in case we dont know what happen
          res.status(500).send({
            message: err.message || 'an error occured.'
          })
        })
    })
}

// Find all users
exports.findAll = (req, res) => {
  Users.find()
    .then(users => {
      res.send(users)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'an error occured.'
      })
    })
}

// find a specific user
exports.findOne = (req, res) => {
  Users.findById(req.params.usersId)
    .then(users => {
      if (!users) {
        return res.status(404).send({
          message: 'users ' + req.params.usersId + ' not found'
        })
      }
      res.send(users)
    }).catch(err => {
      return res.status(500).send({
        message: 'an error occured'
      })
    })
}

// update an user
exports.update = (req, res) => {
  if (!req.body.pseudo) {
    return res.status(400).send({
      message: 'no pseudo given'
    })
  }
  if (!req.body.token) {
    return res.status(400).send({
      message: 'no token given'
    })
  }
  if (!req.body.account) {
    return res.status(400).send({
      message: 'no data account given'
    })
  }
  tokenMethod.tokenIsGood(req.body.pseudo, req.body.token)
    .then(tokenResponse => {
      Users.find({
        pseudo: req.body.pseudo,
        token: req.body.token
      })
        .then(response => {
          if (!response) {
            return res.status(404).send({
              message: 'the user is not found'
            })
          }
          let password = response[0].password
          if (req.body.account.oldpassword !== '' && req.body.account.newpassword !== '' && req.body.account.verifpassword !== '') {
            if (req.body.account.newpassword === req.body.account.verifpassword) {
              crypto.compareHash(req.body.account.oldpassword, response[0].password, isMatch => {
                if (isMatch) {
                  crypto.genHash(req.body.account.newpassword)
                    .then(newpass => {
                      password = newpass.hash
                      console.log('new password hashed' + newpass.hash)
                      Users.findByIdAndUpdate(response[0]._id, {
                        pseudo: req.body.account.pseudo,
                        password: password,
                        role: response[0].role,
                        first_name: req.body.account.firstname,
                        last_name: req.body.account.lastname,
                        email: req.body.account.email
                      })
                        .then(data => {
                          console.log('ok data => :' + data)
                          res.send('The profile is updated')
                        })
                        .catch(err => {
                          return res.status(500).send({
                            message: 'an error occured'
                          })
                        })
                    })
                    .catch(err => {
                      console.log('catch l127')
                      res.status(500).send({
                        message: 'an error occured'
                      })
                    })
                } else {
                  res.status(500).send({
                    message: 'the new password is not good.'
                  })
                }
              })
            } else {
              res.status(500).send({
                message: 'the old password is bad'
              })
            }
          } else {
            Users.findByIdAndUpdate(response[0]._id, {
              pseudo: req.body.account.pseudo,
              password: password,
              role: response[0].role,
              first_name: req.body.account.firstname,
              last_name: req.body.account.lastname,
              email: req.body.account.email
            })
              .then(data => {
                console.log('ok data => :' + data)
                res.send('The profile is updated')
              })
              .catch(err => {
                return res.status(500).send({
                  message: 'an error occured'
                })
              })
          }
        })
        .catch(err => {
          return res.status(500).send({
            message: 'an error occured'
          })
        })
    })
    .catch(err => {
      return res.status(500).send({
        message: 'an error occured'
      })
    })
}

// check for user connection
exports.connection = (req, res) => {
  Users.find({
    pseudo: req.body.pseudo
  })
    .then(response => {
      // Check if no pseudo matching with pseudo in DB (prevent crash compareHash)
      if (typeof (response[0]) !== 'undefined') {
        crypto.compareHash(req.body.password, response[0].password, isMatch => {
          // if isMatch is true, the pseudo & password are matching with the response
          if (isMatch) {
            token.genToken(response[0]._id)
            Users.findById(response[0]._id)
              .then(result => {
                if (result.token !== null || result.token === '') {
                  token.verifyToken(result.token)
                    .then(responseToken => {
                      console.log(responseToken.isTokenVerified)
                      console.log('result token :' + result.token)
                      if (responseToken.isTokenVerified) {
                        Users.findByIdAndUpdate(response[0]._id, {
                          token: result.token
                        }, { new: true })
                        Users.findById(result._id)
                          .then(data => {
                            // data._id=null
                            console.log('data value :' + data)
                            res.send(data)
                          })
                          .catch(err => {
                            console.error(err)
                          })
                      }
                    }).catch(err => {
                      console.error(err)
                    })
                } else {
                  console.log('error : no token found')
                }
              })
              .catch(err => {
                console.error(err)
              })
          } else {
            res.send(false)
          }
        })
      } else {
        console.log('bad login or password')
        res.send(false)
      }
    })
    .catch(err => {
      console.error(err)
    })
}

// check the token of user connection, if the token is available the method will return true, if the token is not available the method return false
exports.tokenVerify = (req, res) => {
  console.log('testing tokenVerify ######################################1111111111#')
  console.log('req.body.pseudo => ' + req.body.pseudo + '\n req.body.token => ' + req.body.token)
  if (!req.body.pseudo) {
    return res.status(400).send({
      message: 'no pseudo given'
    })
  }
  if (!req.body.token) {
    return res.status(400).send({
      message: 'no token given'
    })
  }
  Users.find({
    pseudo: req.body.pseudo,
    token: req.body.token
  })
    .then(response => {
      tokenMethod.tokenIsGood(req.body.pseudo, req.body.token)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          console.error(err)
        })
    })
    .catch(err => {
      console.error(err)
    })
  console.log('testing tokenVerify #######################################')

}

// Delete an user
exports.delete = (req, res) => {
  Users.findByIdAndRemove(req.params.usersId)
    .then(users => {
      if (!users) {
        return res.status(404).send({
          message: 'User not found'
        })
      }
      res.send({ message: 'Users delete' })
    }).catch(err => {
      if (err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Users not found'
        })
      }
      return res.status(500).send({
        message: 'an error occured'
      })
    })
}
