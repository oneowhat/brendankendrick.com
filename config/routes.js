var mongoose = require('mongoose')
  , Product = mongoose.model('Product')
  , async = require('async');
  
module.exports = function(app, passport, auth) {

  var users = require('../app/controllers/users');
  app.get('/users/login', users.login);
  app.post('/users/session', users.session);
  app.post('/users/create', auth.requiresLogin, users.create);

  var resume = require('../app/controllers/resume');
  app.get('/resume', resume.index);

  var articles = require('../app/controllers/articles');
  app.get('/articles', articles.index);
  
  var products = require('../app/controllers/products');
  app.get('/', products.index);
  app.get('/products', products.index);
  app.get('/products/new', auth.requiresLogin, products.new);
  app.post('/products', auth.requiresLogin, products.create);
  app.get('/products/:productId', products.show);
  
  app.param('productId', products.product)
  
};
