const express = require('express')
const router = express.Router()
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
  console.log(req);
  activity.userId = req.user._id
  activity.title = req.body.activity
  activity.save()
  .then(function(activity) {
    res.redirect("/api/activities")
  }).catch(function(error) {
    res.json(error)
  })
})

router.get('/add', function(req,res) {
  res.render('add')
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
  const date = new Date()
  Activity.findOne({
    _id: req.params.id
  })
  .then(function(activity) {
    activity.stats.push({
      date: date,
      number: req.body.number
    })
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
    activity.title = req.body.title
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


module.exports = router
