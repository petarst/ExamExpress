let express = require('express')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let passport = require('passport')
//let formidable = require('express-formidable')
//let multipart = require('connect-multiparty');

module.exports = (config, app) => {
  app.set('view engine', 'pug')
  app.set('views', config.rootPath + 'server/views')

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  //app.use(formidable())
  //app.use(multipart())
  app.use(session({
    secret: 'harryPootter',
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })
  app.use(express.static(config.rootPath + 'public'))
}
