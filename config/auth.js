// require login routing helper

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('users/login')
  }
  next()
};
