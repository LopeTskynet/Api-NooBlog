const Users = require('../models/users.models')

exports.create = (req,res) => {
    
    if(!req.body.pseudo) {
        return res.status(400).send({
            message: "no pseudo given"
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

}

exports.findOne = (req,res) => {

}

exports.update = (req,res) => {

}

exports.delete = (req,res) => {

}