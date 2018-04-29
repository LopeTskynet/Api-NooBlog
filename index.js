const config = require('./config/server')
const express = require('express')
const bodyParser = require('body-parser')

//create express app
const app = express()

//parse request application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//parse request application/json
app.use(bodyParser.json())

//router
app.get('/', (req,res) => {
    res.json({"Message": "Welcome on the NooBlog API"})
})

require('./app/routes/users.routes')(app)

//lancement du serveur
app.listen(config.port, () => {
    console.log("Server on port " + config.port)
})

const dbConfig = require('./config/database')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url)
  .then(() => {
    console.log("Connected to the database")
  }).catch(err => {
    console.log("Cannot connect to the database. Exiting now...")
    process.exit()
  })