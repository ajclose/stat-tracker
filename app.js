const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moment = require('moment')
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const registrationRoute = require('./routes/registration')
const sessionRoute = require('./routes/session')
const apiRoute = require('./routes/api')
const homepageRoute = require('./routes/homepage')
const User = require('./models/User')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set("layout", 'layout')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
mongoose.Promise = require('bluebird')
const mongoURL = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/stats"
mongoose.connect(mongoURL)

passport.use(new BasicStrategy(
  function(username, password, done) {

    User.findOne({username: username, password: password})
    .then( function(user){
      if(user){
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }
));

app.use(registrationRoute)
app.use(sessionRoute)
app.use(passport.authenticate('basic', {session: false}))
app.use(apiRoute)
app.use(homepageRoute)

const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log("app is live!");
})
