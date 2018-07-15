module.exports = (app) => {
    const article = require('../controllers/article.controller.js')
    //Router linked to the controller
    app.post('/api/v1/article', article.create)
    app.post('/api/v1/article/all', article.findAll)
}
