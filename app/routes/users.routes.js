module.exports = (app) => {
    const users = require('../controllers/users.controller.js')
    app.post('/api/v1/users', users.create)
    app.get('/api/v1/users', users.findAll)
    app.get('/api/v1/users/:usersId', users.findOne)
    app.put('/api/v1/users/:usersId', users.update)
    app.delete('/api/v1/users/:usersId', users.delete)
}