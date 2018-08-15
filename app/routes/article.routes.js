module.exports = (app) => {
    const article = require('../controllers/article.controller.js')
    //Router linked to the controller
    app.post('/api/v1/article/create', article.create)
    app.get('/api/v1/article/all', article.findAll)
    app.get('/api/v1/article/:articleId', article.findOne)
}
