const User = require("../models/User")
function authentication(req, res, next) {
  if(req.session.userId) {
    User.findOne({_id: req.session.userId})
    .then(function(user) {
      req.user = user
      next();
    })
  } else {
    res.redirect("/login")
  }
}

module.exports = authentication
