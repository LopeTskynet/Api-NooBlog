const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// replace mongoose promise system with bluebird promise
const Promise = require('bluebird')
mongoose.Promise = Promise

var cors = require('cors')

const logger = require('./app/logs')
// Config files
const dbConfig = require('./config/database.conf')
const config = require('./config/server.conf')

// create express app
const app = express()

// parse request application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse request application/json
app.use(bodyParser.json())

// use cors for allow access on requests
app.use(cors())
// router
app.get('/', (req,res) => {
  res.json({'Message': 'Welcome on the NooBlog API'})
})

require('./app/routes/users.routes')(app)
require('./app/routes/article.routes')(app)
require('./app/routes/technicalsheet.routes')(app)
require('./app/routes/userthings.routes')(app)
// launch
app.listen(config.port, () => {
  console.log('Server on port ' + config.port)
})

mongoose.connect(dbConfig.url)
  .then(() => {
    console.log('Connected to the database')
  }).catch(err => {
    console.log('Cannot connect to the database. Exiting now...')
    process.exit()
  })

module.exports = app
