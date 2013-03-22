var mongoose = require('mongoose')
  , async = require('async')
  , fs = require('fs')
  , path = require('path')
  , join = path.join
  , Product = mongoose.model('Product');
  
exports.product = function(req, res, next, productId){
  Product.load(productId, function(err, product){
    if (err) return next(err);
    if (!product) return next(new Error('Failed to load product ' + productId));
    req.product = product;
    next();
  });
};

exports.new = function(req, res){
  res.render('products/new', {
    title: 'New Product',
    product: new Product({})
  });
};

exports.create = function(req, res) {
  var product = new Product(req.body);
  if (err) {
    res.render('products/new', {
      title: 'New Product',
      product: product,
      errors: err.errors
    });
  }
  product.save(function(err){
    if (err) {
      res.render('products/new', {
        title: 'New Product',
        product: product,
        errors: err.errors
      });
    } else {
      res.redirect('/products/'+product.id);
    }
  });
};

exports.show = function(req, res){
  var product = req.product;
  res.render('products/show', {
    title: product.name,
    product: product
  });
};
  
exports.index = function(req, res, options){
  Product.list(options, function(err, products){
    if (err) return res.render('500');
    Product.count().exec(function(err, count){
      res.render('products/index', {
        title: 'Brendan Kendrick | Software Developer',
        products: products
      });
    });
  });
};
