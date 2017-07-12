const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const registrationRoute = require('./routes/registration')
const sessionRoute = require('./routes/session')
const apiRoute = require('./routes/api')
const User = require('./models/User')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set("layout", 'layout')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/stats')

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


app.use(sessionRoute)
app.use(registrationRoute)
app.use(passport.authenticate('basic', {session: false}))
app.use(apiRoute)


app.listen(3000, function() {
  console.log("app is live!");
})
