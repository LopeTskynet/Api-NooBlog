module.exports = (app) => {
  const technicalsheet = require('../controllers/technicalsheet.controller.js')
  // Router linked to the controller
  app.post('/api/v1/technicalsheet/create', technicalsheet.create)
  app.get('/api/v1/technicalsheet/getall', technicalsheet.findAll)
}
