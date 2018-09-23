module.exports = (app) => {
  const technicalsheet = require('../controllers/technicalsheet.controller.js')
  // Router linked to the controller
  app.post('/api/v1/technicalsheet/create', technicalsheet.create)
  app.post('/api/v1/technicalsheet/getfinish', technicalsheet.findAllFinish)
  app.post('/api/v1/technicalsheet/inprogress', technicalsheet.findInProgress)
  app.post('/api/v1/technicalsheet/update', technicalsheet.updateById)
}
