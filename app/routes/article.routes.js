module.exports = (app) => {
  const article = require('../controllers/article.controller.js')
  // Router linked to the controller
  app.post('/api/v1/article/create', article.create)
  app.post('/api/v1/article/all', article.findAll)
  app.post('/api/v1/article/inprogress', article.findInProgress)
  app.get('/api/v1/article/:articleId', article.findOne)
}
