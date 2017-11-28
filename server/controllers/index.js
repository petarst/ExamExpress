let homeController = require('./home-controller')
let usersController = require('./users-controller')
let pictureController = require('./pictures-controller')

module.exports = {
  home: homeController,
  users: usersController,
  picture: pictureController
}
