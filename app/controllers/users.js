var mongoose = require('mongoose')
  , User = mongoose.model('User');
  
exports.signin = function(req, res) {};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.login = function(req, res) {
  res.render('users/login', {
    title: 'Login',
    nav: '',
    user: req.user,
    message: req.flash('error')
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.session = function(req, res) {
  res.redirect('/');
};

exports.create = function (req, res) {
  var user = new User(req.user);
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      return res.render('users/signup', { errors: err.errors, user: user })
    }
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/fuckyeah')
    })
  })
}
