//models import
const Users = require('../models/users.models')
const crypto = require('./crypto')
const Promise = require("bluebird")
const token = require('./connection.token')
//Methods
//Create a new user
exports.create = (req,res) => {
    //check if everything is here
    if(!req.body.pseudo) {
        return res.status(400).send({
            message: "no pseudo given"
        })
    }

    if(!req.body.password) {
        return res.status(400).send({
            message: "no password given"
        })
    }

    if(!req.body.email) {
        return res.status(400).send({
            message: "no email given"
        })
    }
    crypto.genHash(req.body.password)
    .then(result => {
        var hash = result.hash
        //preparing change for the database using the models we import
        const users = new Users({
            pseudo: req.body.pseudo,
            password: hash,
            role: "guest",
            first_name: req.body.first_name || null,
            last_name: req.body.last_name ||null,
            email: req.body.email,
            token: null
        })
        //doing the modif on the database
        users.save()
        .then(data => {
            //returning the data we just create
            res.send(data)
        }).catch(err =>{
            //in case we dont know what happen
            res.status(500).send({
                message: err.message ||"an error occured."
            })
        })
    })
}

//Find all users
exports.findAll = (req,res) => {
    Users.find()
    .then(users => {
        res.send(users)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "an error occured."
        })
    })
}

//find a specific user
exports.findOne = (req,res) => {
    Users.findById(req.params.usersId)
    .then(users => {
        if(!users){
            return res.status(404).send({
                message: "users " + req.params.usersId + " not found"
            })
        }
        res.send(users)
    }).catch(err => {
        return res.status(500).send({
            message: "an error occured"
        })
    })
}

//update an user
exports.update = (req,res) => {
    Users.findByIdAndUpdate(req.params.usersId, {
        pseudo: req.body.title,
        password: req.body.password,
        role: "guest",
        first_name: req.body.first_name || null,
        last_name: req.body.last_name ||null,
        email: req.body.email
    }, {new: true})//change our data to the updated version of the models
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "users with id " + req.params.usersId + " not found"
            })
        }
        res.send(users)
    }).catch(err => {
        return res.status(500).send({
            message: "an error occured"
        })
    })
}

//check for user connection
exports.connection = (req,res) => {
  Users.find({
    pseudo: req.body.pseudo
  })
  .then(response => {
    //Check if no pseudo matching with pseudo in DB (prevent crash compareHash)
    if(typeof(response[0]) !== 'undefined'){
      crypto.compareHash(req.body.password, response[0].password, isMatch => {
        // if isMatch is true, the pseudo & password are matching with the response
        token.genToken(response[0]._id)
        Users.findById(response[0]._id)
        .then( result => {
          if(result.token !== null || result.token === ""){
           token.verifyToken(result.token)
           .then(responseToken => {
             console.log(responseToken.isTokenVerified)
             if(responseToken.isTokenVerified) {
               response[0]._id = null
               res.send(response[0])
             }

           })
          } else {
            console.log('error : no token found')
          }

        })
        .catch( err => {
          console.error(err)
        })
      })

    } else {
      console.log('bad login or password')
    }
  })
  .catch(err => {
    console.error(err)
  })
}

// check the token of user connection, if the token is available the method will return true, if the token is not available the method return false
exports.tokenVerify = (req,res) => {
  Users.find({
    pseudo: req.body.pseudo,
    token: req.body.token
  })
  .then(response => {
    if(typeof(response[0]) !== 'undefined'){
      // token.verifyToken(response[0].token)
      token.verifyToken(req.body.token)
      .then(response => {
        console.log(response)
      })
    } else {
      console.log('error : no token found')
    }
  })
  .catch( err => {
    console.error(err)
  })
}

//Delete an user
exports.delete = (req,res) => {
    Users.findByIdAndRemove(req.params.usersId)
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "User not found"
            })
        }
        res.send({message: "Users delete"})
    }).catch(err => {
        if(err.name === 'NotFound') {
            return res.status(404).send({
                message: "Users not found"
            })
        }
        return res.status(500).send({
            message: "an error occured"
        })
    })
}
