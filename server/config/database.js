let mongoose = require('mongoose')
let fs = require('fs')

mongoose.Promise = global.Promise

module.exports = (config) => {
  mongoose.connect(config.db)

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      console.log(err)
    }

    console.log('MongoDB ready!')
  })

  db.on('error', (err) => {
    fs.appendFile('log.txt', err, function (err) {
      if(err) {
          console.log('Database error: ' + err)
      }
    })
  }) 
  
require('../data/User').seedAdminUser()
require('../data/Picture')
}