const express = require('express')
const app = express()
const mustache = require('mustache-express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const registrationRoute = require('./routes/registration')
const sessionRoute = require('./routes/session')
const apiRoute = require('./routes/api')
const authentication = require("./middleware/authentication")

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set("layout", 'layout')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/stats')
var sess = {
  secret: 'ajs)*ijasdjf9asdjf',
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {},
  resave: true,
  saveUninitialized: true
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(session(sess))

app.use(sessionRoute)
app.use(registrationRoute)
app.use(authentication)
app.use(apiRoute)


app.listen(3000, function() {
  console.log("app is live!");
})
