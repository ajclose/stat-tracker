const express = require('express')
const router = express.Router()
const moment = require('moment')
const User = require('../models/User')
const Activity = require('../models/Activity')

router.get("/api/activities", function(req, res) {
  Activity.find({
    userId: req.user._id
  })
  .then(function(activities) {
    res.json(activities)
  })
})

router.post("/api/activities", function(req, res) {
  activity = new Activity()
  activity.userId = req.user._id
  activity.title = req.body.activity
  activity.unit = req.body.unit
  activity.save()
  .then(function(activity) {
    res.redirect("/api/activities")
  }).catch(function(error) {
    res.json(error)
  })
})

router.get('/api/activities/:id', function(req, res) {
  Activity.findOne({
    _id: req.params.id
  })
  .then(function(activity) {
    res.json(activity)
  })
})

router.post('/api/activities/:id/stats', function(req, res) {
  const date = moment(req.body.date).format('MMMM Do YYYY')
  let statExists = false
  Activity.findOne({
    _id: req.params.id
  })
  .then(function(activity) {
    for (var i = 0; i < activity.stats.length; i++) {
      const stat = activity.stats[i]
      if (stat.date === date) {
        stat.data = req.body.data
        statExists = true
      }
    }
    if (!statExists) {
      activity.stats.push({
        date: date,
        data: req.body.data
      })
    }

    activity.save()
    .then(function(activity) {
      res.json(activity)
    })
  })
})

router.put('/api/activities/:id', function(req, res) {
  Activity.findOne({
    _id: req.params.id
  })
  .then(function(activity) {
    activity.title = req.body.activity
    activity.unit = req.body.unit
    activity.save()
    .then(function(activity) {
      res.json(activity)
    })
  })
})

router.delete('/api/activities/:id', function(req, res) {
  Activity.deleteOne({
    _id: req.params.id
  })
  .then(function(activity) {
    res.json(activity)
  })
  .catch(function(error) {
    res.json(error)
  })
})

router.delete('/api/stats/:id', function(req, res) {
  const activityId = req.body.activityId
  Activity.update({_id: activityId}, {$pull: {stats: {_id: req.params.id}}})
    .then(function(activity) {
      res.json(activity)
    })
    .catch(function(error) {
      res.json(error)
    })
  })

module.exports = router
