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


module.exports = router
