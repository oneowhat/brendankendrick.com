var mongoose = require('mongoose')
  , Product = mongoose.model('Product')
  , async = require('async');
  
module.exports = function(app, passport, auth) {

  var home = require('../app/controllers/home');
  app.get('/', home.index);

  var users = require('../app/controllers/users');
  app.get('/users/login', users.login);
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session);
  app.post('/users/create', auth.requiresLogin, users.create);

  var resume = require('../app/controllers/resume');
  app.get('/resume', resume.index);

  var articles = require('../app/controllers/articles');
  app.get('/articles', articles.index);
  app.get('/articles/new', auth.requiresLogin, articles.new);
  app.post('/articles', auth.requiresLogin, articles.create);
  app.get('/articles/:title', articles.show);
  app.get('/articles/:title/edit', auth.requiresLogin, articles.edit);
  
  var products = require('../app/controllers/products');
  app.get('/products', products.index);
  app.get('/products/new', auth.requiresLogin, products.new);
  app.post('/products', auth.requiresLogin, products.create);
  app.get('/products/:productId', products.show);
  app.get('/products/:productId/edit', auth.requiresLogin, products.edit);
  app.put('/products/:productId', auth.requiresLogin, products.update);
  app.del('/products/:productId', auth.requiresLogin, products.destroy);
  
  app.param('productId', products.product)
  app.param('title', articles.article)
  
};
