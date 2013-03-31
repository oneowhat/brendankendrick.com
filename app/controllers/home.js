var mongoose = require('mongoose')
  , Product = mongoose.model('Product')

exports.index = function(req, res) {
  Product.list({}, function(err, products) {
    if (err) return res.render('500');
    Product.count().exec(function(err, count) {
      res.render('index', {
        title: 'Brendan Kendrick | Software Developer',
        nav: 'nav-home',
        products: products.length > 0,
        user: req.user
      });
    });
  });
};
