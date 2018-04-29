const Users = require('../models/users.models')

exports.create = (req,res) => {
    
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

    const users = new Users({
        pseudo: req.body.title,
        password: req.body.password,
        role: "guest",
        first_name: req.body.first_name || null,
        last_name: req.body.last_name ||null,
        email: req.body.email
    })

    users.save()
    .then(data => {
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message: err.message ||"an error occured."
        })
    })
}

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

exports.update = (req,res) => {
    Users.findByIdAndUpdate(req.params.usersId, {
        pseudo: req.body.title,
        password: req.body.password,
        role: "guest",
        first_name: req.body.first_name || null,
        last_name: req.body.last_name ||null,
        email: req.body.email
    }, {new: true})
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

exports.delete = (req,res) => {

}