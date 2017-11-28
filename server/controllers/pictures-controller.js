let Picture = require('mongoose').model('Picture')
let fs = require('fs')
let formidable = require('express-formidable')
//let multer = require('multer')
//let upload = multer({dest: './uploads'})
//let gfs

module.exports = {
  add: (req, res) => {
    res.render('picture/add')
  },
  create: (req, res) => {
    let picture = req.body
    picture.author = res.locals.currentUser.username
    Picture.create(picture).then(picture => {
    var message = encodeURIComponent('Successfully created!')
    res.redirect('/?message=' + message)
    })
  },
  list: (req, res) => {
    Picture.find().limit(100).sort().then(function (data) {
      
        res.render('picture/list', { picture: data })
      })
  },
  details: (req, res) => {
    Picture.findById(req.params.id).then(function (data) {
      res.render('picture/details', data)
    })
  },
  edit: (req, res) => {
    Picture.findById(req.params.id).then(function (data) {
      res.render('picture/edit', data)
    })
  },
  editpicture: (req, res) => {
    let pictureId = req.params.id
    let pictureTitle = req.body.title
    let pictureDescription = req.body.description

    if (pictureTitle === '') {
      addMessage(req, res, 'You need to add picture')
      return false
    }

    if (pictureDescription === '') {
      addMessage(req, res, 'You need to fill a Description')
      return false
    }

    if (pictureId) {
      Picture.findById(pictureId).then(function (picture) {
        picture.title = pictureTitle
        picture.description = pictureDescription
        picture.author = res.locals.currentUser.username
        picture.save()
        var successMsg = '<p>You have successfully edited a picture</p>'
        addMessage(req, res, successMsg)
      })
    }
  },
  delete: (req, res) => {
    Picture.findOneAndRemove({_id: req.params.id}).then(function () {
      var html = '<p>You have successfully deleted an picture</p> <a href="/picture/list">Go back to picture list</a>'

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(html)
      res.end()
    })
  }
}

function addMessage (req, res, text) {
  if (req.params.id) {
    var href = 'picture/list' + req.params.id

    var message = '<p>' + text + '</p><a href="picture/list">Go back</a>'
  } else {
    message = '<p>' + text + '</p><a href="picture/details">Go back</a>'
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write(message)
  res.end()
}
