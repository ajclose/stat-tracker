const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const userSchema = new mongoose.Schema({
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
