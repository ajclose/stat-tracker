const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', function(req, res) {
  res.render('login')
})

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res) {
  const user = new User()
  user.email = req.body.email
  user.username = req.body.username
  user.password = req.body.password
  user.save()
  .then(function(user) {
    res.redirect('/')
  })
  .catch(function(error) {
    res.render('signup')
  })
})

module.exports = router;
