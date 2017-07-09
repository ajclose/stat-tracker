const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const indexRoute = require('./routes/index')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
// app.set("layout", 'layout')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/stats')

app.use(indexRoute)

app.listen(3000, function() {
  console.log("app is live!");
})
