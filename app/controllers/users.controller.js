//models import
const Users = require('../models/users.models')
const crypto = require('./crypto')
const Promise = require("bluebird")

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
        console.log("k")
        //preparing change for the database using the models we import
        const users = new Users({
            pseudo: req.body.title,
            password: hash,
            role: "guest",
            first_name: req.body.first_name || null,
            last_name: req.body.last_name ||null,
            email: req.body.email
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