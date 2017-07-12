const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post("/register", function(req, res){
  const user = new User();
  user.username = req.body.username
  user.password = req.body.password
  user.email = req.body.email
  user.save()
  .then(function(user){
    req.session.userId = user._id
    res.redirect("/")
  })
  .catch( function(error){
    console.log(error)
    res.render("registration/new", {
      user: user,
      error: error
    })
  })

})


module.exports = router
