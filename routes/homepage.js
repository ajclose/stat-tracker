const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Activity = require('../models/Activity')

router.get('/', function(req, res) {
  res.render('index')
})

module.exports = router
