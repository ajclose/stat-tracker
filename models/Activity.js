const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const activitySchema = new mongoose.Schema({
  userId: {type: String, required: true},
  title: {type: String, required: true},
  unit: {type: String, required: true},
  stats: [{
    date: {type: String, required: true},
    data: {type: Number, required: true}
  }]
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity
