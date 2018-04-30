const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Promise = require("bluebird")
const logger = require("./app/logs")
//Config files
const dbConfig = require('./config/database.conf')
const config = require('./config/server.conf')

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

//replace mongoose promise system with bluebird promise
mongoose.Promise = Promise

mongoose.connect(dbConfig.url)
  .then(() => {
    console.log("Connected to the database")
  }).catch(err => {
    console.log("Cannot connect to the database. Exiting now...")
    process.exit()
  })