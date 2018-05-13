const mongoose = require('mongoose')

//Schema of the database
const UsersSchema = mongoose.Schema({
    pseudo: String,
    password: String,
    role: String,
    first_name: String,
    last_name: String,
    email: String,
    token: Object
})

module.exports = mongoose.model('Users', UsersSchema)
