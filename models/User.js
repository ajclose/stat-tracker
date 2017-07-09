const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  activities: {
    title: [{
      title: {type: String, required: true},
      date: {type: Date},
      count: {type: Number}
    }
    ]
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
