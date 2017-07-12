const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const activitySchema = new mongoose.Schema({
  userId: {type: String, required: true},
  title: {type: String, required: true},
  stats: [{
    date: {type: Date, required: true},
    number: {type: Number, required: true}
  }]
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity
