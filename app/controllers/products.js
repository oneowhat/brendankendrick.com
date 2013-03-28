var mongoose = require('mongoose')
  , async = require('async')
  , Product = mongoose.model('Product')
  , _ = require('underscore');
  
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
  
  product.uploadImageAndSave(req.files.image, function(err) {
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

exports.show = function(req, res) {
  res.render('products/show', {
    title: req.product.name,
    product: req.product,
    user: req.user
  });
};

exports.edit = function(req, res) {
  res.render('products/edit', {
    title: 'Edit ' + req.product.name,
    product: req.product
  });
};

exports.update = function(req, res) {
  var product = req.product;
  product = _.extend(product, req.body);
  
  product.uploadImageAndSave(req.files.image, function(err) {
    if (err) {
      res.render('products/edit', {
        title: 'Edit ' + req.product.name,
        product: req.product,
        error: err.errors
      });
    } else {
      res.redirect('/products/'+product.id);
    }
  }); 
};

exports.destroy = function(req, res) {
  var product = req.product;
  product.active = false;
  product.save();
  res.redirect('/products');
};
  
exports.index = function(req, res, options) {
  Product.list(options, function(err, products) {
    if (err) return res.render('500');
    Product.count().exec(function(err, count) {
      res.render('products/index', {
        title: 'Brendan Kendrick | Software Developer',
        products: products,
        user: req.user
      });
    });
  });
};
