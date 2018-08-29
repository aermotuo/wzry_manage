const mongoose = require('mongoose')
const person = mongoose.Schema({
  name: String,
  sex: String,
  post: String
})

module.exports = mongoose.model('person', person)
