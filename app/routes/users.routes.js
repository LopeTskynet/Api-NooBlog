module.exports = (app) => {
  const users = require('../controllers/users.controller.js')
  // Router linked to the controller
  app.post('/api/v1/users', users.create)
  app.post('/api/v1/users/connection', users.connection)
  app.post('/api/v1/users/isconnected', users.tokenVerify)
  app.get('/api/v1/users', users.findAll)
  app.get('/api/v1/users/:usersId', users.findOne)
  app.put('/api/v1/users/update/', users.update)
  app.delete('/api/v1/users/:usersId', users.delete)
}
