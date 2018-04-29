const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    Pseudo: String,
    Password: String,
    Role: String,
    First_name: String,
    Last_name: String,
    Email: String
})

module.exports = mongoose.model('Users', UsersSchema)