let controllers = require('../controllers')
let auth = require('../config/auth')

module.exports = (app, config) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)

  app.get('/picture/list', controllers.picture.list)
  app.get('/picture/details/:id', auth.isAuthenticated, controllers.picture.details)
  app.post('/picture/details/:id', auth.isAuthenticated, controllers.picture.details)
  
  app.post('/picture/details/:id/delete', auth.isInRole('Admin'), controllers.picture.delete)
  app.get('/picture/edit/:id', auth.isAuthenticated, controllers.picture.edit)
  app.post('/picture/edit/:id', auth.isInRole('Admin'), controllers.picture.editpicture)
  app.get('/picture/add', auth.isAuthenticated, controllers.picture.add)
  app.post('/picture/create', auth.isAuthenticated, controllers.picture.create)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}
