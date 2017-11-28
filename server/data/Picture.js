let mongoose = require('mongoose')
let requiredValidationMessage = '{PATH} is required'

let pictureSchema = mongoose.Schema({
  title: { type: String, required: requiredValidationMessage, unique: true },
  description: { type: String, required: requiredValidationMessage },
  author: {type: String},
  piblished: {type: Date},
  tags: [String]
})

let Picture = mongoose.model('Picture', pictureSchema)

