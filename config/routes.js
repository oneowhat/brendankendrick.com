var mongoose = require('mongoose')
  , Product = mongoose.model('Product')
  , async = require('async');
  
module.exports = function(app) {

  var resume = require('../app/controllers/resume');
  app.get('/resume', resume.index);

  var articles = require('../app/controllers/articles');
  app.get('/articles', articles.index);
  
  var products = require('../app/controllers/products');
  app.get('/', products.index);
  app.get('/products', products.index);
  app.get('/products/new', products.new);
  app.post('/products', products.create);
  app.get('/products/:productId', products.show);
  
  app.param('productId', products.product)
  
};
