module.exports = (app) => {
  const userthings = require('../controllers/userthings.controller.js')
  // Router linked to the controller
  // app.post('/api/v1/users', users.create)
  app.post('/api/v1/userthings/thingstoknow/create', userthings.create)
  app.post('/api/v1/userthings/thingstoknow/getall', userthings.getAllUserThings)
  app.post('/api/v1/userthings/thingstoknow/update', userthings.updateThingById)
}
