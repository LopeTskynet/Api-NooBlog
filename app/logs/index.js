const winston = require('winston')

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './app/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './app/logs/combined.log' })
  ]
})

module.exports = logger
