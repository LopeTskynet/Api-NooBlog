const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    pseudo: String,
    password: String,
    role: String,
    first_name: String,
    last_name: String,
    email: String
})

module.exports = mongoose.model('Users', UsersSchema)